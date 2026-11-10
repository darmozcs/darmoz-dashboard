import {
  usePublishWaFlowMutation,
  useSaveWaFlowDraftMutation,
  useValidateWaFlowMutation,
  useWaFlowQuery,
  useWaFlowsQuery,
} from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { WaFlowIssue, WaNodeType } from "@/models";
import { notifications } from "@mantine/notifications";
import {
  addEdge,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
} from "@xyflow/react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { NODE_SPACING, NODE_TYPES } from "../../const/nodeTypes.const";
import {
  newNodeId,
  pruneEdges,
  toDefinition,
  toFlowEdges,
  toFlowNodes,
  type FlowNode,
} from "../../utils/flowGraph";

const validationErrors = (error: unknown): WaFlowIssue[] | null => {
  const data = (error as { response?: { status?: number; data?: { errors?: WaFlowIssue[] } } })
    ?.response;
  return data?.status === 422 ? (data.data?.errors ?? []) : null;
};

export const useFlowEditor = (botId: string, flowId: string) => {
  const { t } = useTranslation("whatsapp");
  const flowQuery = useWaFlowQuery(botId, flowId);
  const flowsQuery = useWaFlowsQuery(botId);
  const saveMutation = useSaveWaFlowDraftMutation();
  const validateMutation = useValidateWaFlowMutation();
  const publishMutation = usePublishWaFlowMutation();

  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [startNodeId, setStartNodeId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [issues, setIssues] = useState<WaFlowIssue[]>([]);
  const [savedSnapshot, setSavedSnapshot] = useState("");

  const flow = flowQuery.data?.data;
  useEffect(() => {
    if (!flow) return;
    const definition = flow.draftDefinition;
    setNodes(toFlowNodes(definition));
    setEdges(toFlowEdges(definition));
    setStartNodeId(definition.startNodeId);
    setSavedSnapshot(JSON.stringify(definition));
  }, [flow, setNodes, setEdges]);

  const definition = useMemo(
    () => toDefinition(startNodeId, nodes, edges),
    [startNodeId, nodes, edges],
  );
  const isDirty = savedSnapshot !== "" && JSON.stringify(definition) !== savedSnapshot;

  const notifyError = (error: unknown) =>
    notifications.show({
      color: "red",
      title: t("notifications.error"),
      message: extractErrorMessage(error, t("notifications.saveFailed")),
    });

  const save = async () => {
    await saveMutation.mutateAsync({ botId, flowId, definition });
    setSavedSnapshot(JSON.stringify(definition));
  };

  return {
    flow,
    isLoading: flowQuery.isLoading,
    otherFlows: (flowsQuery.data?.data ?? []).filter((item) => item.id !== flowId),
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    // Cada salida va a un solo nodo: conectar de nuevo reemplaza la conexión anterior.
    onConnect: (connection: Connection) =>
      setEdges((current) =>
        addEdge(
          { ...connection, id: `e_${connection.source}_${connection.sourceHandle}` },
          current.filter(
            (edge) =>
              !(edge.source === connection.source &&
                edge.sourceHandle === connection.sourceHandle),
          ),
        ),
      ),
    startNodeId,
    setStartNodeId,
    selectedId,
    setSelectedId,
    selectedNode: nodes.find((node) => node.id === selectedId) ?? null,
    addNode: (type: WaNodeType) => {
      const id = newNodeId(type);
      const offset = nodes.length * NODE_SPACING;
      setNodes((current) => [
        ...current,
        { id, type, position: { x: 80 + (offset % 600), y: 80 + offset / 3 }, data: NODE_TYPES[type].defaultData() },
      ]);
      setStartNodeId((current) => current ?? id);
      setSelectedId(id);
    },
    updateNodeData: (id: string, patch: Record<string, unknown>) => {
      const next = nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...patch } } : node,
      );
      setNodes(next);
      setEdges((current) => pruneEdges(next, current));
    },
    removeNode: (id: string) => {
      setNodes((current) => current.filter((node) => node.id !== id));
      setEdges((current) => current.filter((e) => e.source !== id && e.target !== id));
      setStartNodeId((current) => (current === id ? null : current));
      setSelectedId(null);
    },
    issues,
    isDirty,
    save: () =>
      save()
        .then(() =>
          notifications.show({ color: "green", title: t("notifications.success"), message: t("editor.saved") }),
        )
        .catch(notifyError),
    isSaving: saveMutation.isPending,
    validate: () =>
      save()
        .then(() => validateMutation.mutateAsync({ botId, flowId }))
        .then((response) => setIssues(response.data))
        .catch(notifyError),
    isValidating: validateMutation.isPending,
    publish: () =>
      save()
        .then(() => publishMutation.mutateAsync({ botId, flowId }))
        .then((response) => {
          setIssues(response.data.warnings);
          notifications.show({
            color: "green",
            title: t("notifications.success"),
            message: t("editor.published", { version: response.data.flow.publishedVersion }),
          });
        })
        .catch((error: unknown) => {
          const errors = validationErrors(error);
          if (errors) setIssues(errors);
          notifyError(error);
        }),
    isPublishing: publishMutation.isPending,
  };
};

export type FlowEditorState = ReturnType<typeof useFlowEditor>;
