import type { WaFlowDefinition, WaNodeType } from "@/models";
import type { Edge, Node } from "@xyflow/react";
import { HANDLES } from "../const/nodeTypes.const";

export type FlowNode = Node<Record<string, unknown>, WaNodeType>;

export interface NodeOutput {
  id: string;
  // Texto a mostrar; si es una clave i18n, label es null y se usa labelKey.
  label: string | null;
  labelKey: string | null;
}

type Option = { id?: unknown; title?: unknown; variable?: unknown; operator?: unknown; value?: unknown };

const asOptions = (value: unknown): Option[] =>
  Array.isArray(value) ? (value as Option[]) : [];

const fixed = (...ids: string[]): NodeOutput[] =>
  ids.map((id) => ({ id, label: null, labelKey: `editor.handles.${id}` }));

const fromOptions = (options: Option[], describe: (option: Option) => string) =>
  options
    .filter((option) => typeof option.id === "string" && option.id)
    .map((option) => ({ id: String(option.id), label: describe(option) || "…", labelKey: null }));

// Salidas de cada tipo de nodo: tienen que coincidir con FlowValidator del backend.
export const getNodeOutputs = (
  type: WaNodeType,
  data: Record<string, unknown>,
): NodeOutput[] => {
  switch (type) {
    case "message":
    case "set_variable":
      return fixed(HANDLES.NEXT);
    case "question":
      return fixed(HANDLES.NEXT, HANDLES.INVALID);
    case "buttons":
      return [
        ...fromOptions(asOptions(data.buttons), (o) => String(o.title ?? "")),
        ...fixed(HANDLES.INVALID),
      ];
    case "list":
      return [
        ...fromOptions(
          asOptions(data.sections).flatMap((section) =>
            asOptions((section as { rows?: unknown }).rows),
          ),
          (o) => String(o.title ?? ""),
        ),
        ...fixed(HANDLES.INVALID),
      ];
    case "condition":
      return [
        ...fromOptions(asOptions(data.rules), (o) =>
          [o.variable, o.operator, o.value].filter(Boolean).join(" "),
        ),
        ...fixed(HANDLES.ELSE),
      ];
    case "http":
      return fixed(HANDLES.SUCCESS, HANDLES.ERROR);
    default:
      return [];
  }
};

export const toFlowNodes = (definition: WaFlowDefinition): FlowNode[] =>
  definition.nodes.map((node) => ({
    id: node.id,
    type: node.type,
    position: node.position ?? { x: 0, y: 0 },
    data: node.data ?? {},
  }));

export const toFlowEdges = (definition: WaFlowDefinition): Edge[] =>
  definition.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    sourceHandle: edge.sourceHandle ?? HANDLES.NEXT,
    target: edge.target,
  }));

export const toDefinition = (
  startNodeId: string | null,
  nodes: FlowNode[],
  edges: Edge[],
): WaFlowDefinition => ({
  startNodeId,
  nodes: nodes.map((node) => ({
    id: node.id,
    type: node.type as WaNodeType,
    position: { x: Math.round(node.position.x), y: Math.round(node.position.y) },
    data: node.data,
  })),
  edges: edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    sourceHandle: edge.sourceHandle ?? null,
    target: edge.target,
  })),
});

// Saca las conexiones de salidas que ya no existen (p. ej. se borró un botón).
export const pruneEdges = (nodes: FlowNode[], edges: Edge[]): Edge[] => {
  const outputs = new Map(
    nodes.map((node) => [
      node.id,
      new Set(getNodeOutputs(node.type as WaNodeType, node.data).map((o) => o.id)),
    ]),
  );
  return edges.filter(
    (edge) =>
      outputs.get(edge.source)?.has(edge.sourceHandle ?? HANDLES.NEXT) &&
      outputs.has(edge.target),
  );
};

export const newNodeId = (type: WaNodeType) =>
  `${type}_${Math.random().toString(36).slice(2, 8)}`;
