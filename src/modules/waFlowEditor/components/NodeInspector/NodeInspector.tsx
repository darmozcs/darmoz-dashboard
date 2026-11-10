import type { WaFlowIssue, WaFlowSummary, WaNodeType } from "@/models";
import { Alert, Button, Group, Paper, ScrollArea, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconFlag, IconTrash } from "@tabler/icons-react";
import type { ComponentType } from "react";
import { useTranslation } from "react-i18next";
import { NODE_TYPES } from "../../const/nodeTypes.const";
import type { FlowNode } from "../../utils/flowGraph";
import { GotoFlowEditor, HttpEditor } from "./editors/IntegrationEditors";
import {
  ConditionEditor,
  QuestionEditor,
  SetVariableEditor,
  TextOnlyEditor,
} from "./editors/LogicEditors";
import { ButtonsEditor, ListEditor, MessageEditor } from "./editors/MessageEditors";
import type { NodeEditorProps } from "./shared/fields";

const EDITORS: Record<Exclude<WaNodeType, "goto_flow">, ComponentType<NodeEditorProps>> = {
  message: MessageEditor,
  buttons: ButtonsEditor,
  list: ListEditor,
  question: QuestionEditor,
  condition: ConditionEditor,
  http: HttpEditor,
  set_variable: SetVariableEditor,
  handoff: TextOnlyEditor,
  end: TextOnlyEditor,
};

interface NodeInspectorProps {
  node: FlowNode | null;
  isStart: boolean;
  issues: WaFlowIssue[];
  otherFlows: WaFlowSummary[];
  onChange: (id: string, patch: Record<string, unknown>) => void;
  onSetStart: (id: string) => void;
  onRemove: (id: string) => void;
}

export const NodeInspector = ({
  node,
  isStart,
  issues,
  otherFlows,
  onChange,
  onSetStart,
  onRemove,
}: NodeInspectorProps) => {
  const { t } = useTranslation("whatsapp");

  if (!node) {
    return (
      <Paper p="md" withBorder h="100%">
        <Text size="sm" c="dimmed">{t("editor.selectNode")}</Text>
      </Paper>
    );
  }

  const type = node.type as WaNodeType;
  const { icon: NodeIcon, color } = NODE_TYPES[type];
  const editorProps = { data: node.data, onChange: (patch: Record<string, unknown>) => onChange(node.id, patch) };
  const Editor = type === "goto_flow" ? null : EDITORS[type];

  return (
    <Paper withBorder h="100%">
      <ScrollArea h="100%" p="sm">
        <Stack gap="sm">
          <Group gap="xs">
            <ThemeIcon color={color} variant="light"><NodeIcon size={16} /></ThemeIcon>
            <Text fw={600}>{t(`editor.types.${type}`)}</Text>
          </Group>
          <Text size="xs" c="dimmed">{t(`editor.descriptions.${type}`)}</Text>
          {issues.map((issue, index) => (
            <Alert key={index} color={issue.severity === "error" ? "red" : "yellow"} p={6}>
              <Text size="xs">{issue.message}</Text>
            </Alert>
          ))}
          {Editor ? <Editor {...editorProps} /> : <GotoFlowEditor {...editorProps} flows={otherFlows} />}
          <Group gap="xs" mt="sm">
            <Button size="xs" variant="light" leftSection={<IconFlag size={14} />}
              disabled={isStart} onClick={() => onSetStart(node.id)}>
              {isStart ? t("editor.isStart") : t("editor.setStart")}
            </Button>
            <Button size="xs" variant="light" color="red" leftSection={<IconTrash size={14} />}
              onClick={() => onRemove(node.id)}>
              {t("editor.removeNode")}
            </Button>
          </Group>
        </Stack>
      </ScrollArea>
    </Paper>
  );
};
