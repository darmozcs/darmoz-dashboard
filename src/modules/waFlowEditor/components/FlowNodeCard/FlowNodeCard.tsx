import type { WaNodeType } from "@/models";
import { Badge, Box, Group, Paper, Stack, Text, ThemeIcon } from "@mantine/core";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { useTranslation } from "react-i18next";
import { NODE_TYPES } from "../../const/nodeTypes.const";
import { useFlowEditorContext } from "../../contexts/flowEditor.context";
import { getNodeOutputs, type FlowNode } from "../../utils/flowGraph";

const SUMMARY_LENGTH = 70;

const summaryOf = (data: Record<string, unknown>) => {
  const text = [data.text, data.path, data.variable].find(
    (value) => typeof value === "string" && value,
  ) as string | undefined;
  return text && text.length > SUMMARY_LENGTH ? `${text.slice(0, SUMMARY_LENGTH)}…` : text;
};

export const FlowNodeCard = ({ id, type, data, selected }: NodeProps<FlowNode>) => {
  const { t } = useTranslation("whatsapp");
  const { startNodeId, issuesByNode } = useFlowEditorContext();
  const nodeType = type as WaNodeType;
  const definition = NODE_TYPES[nodeType];
  const NodeIcon = definition.icon;
  const hasError = issuesByNode.get(id)?.some((issue) => issue.severity === "error");
  const outputs = getNodeOutputs(nodeType, data);
  const borderColor = hasError
    ? "var(--mantine-color-red-6)"
    : selected
      ? `var(--mantine-color-${definition.color}-6)`
      : "var(--mantine-color-gray-4)";

  return (
    <Paper shadow="sm" radius="md" w={240} style={{ border: `2px solid ${borderColor}` }}>
      <Handle type="target" position={Position.Left} />
      <Stack gap={6} p="xs">
        <Group gap="xs" wrap="nowrap">
          <ThemeIcon size="sm" color={definition.color} variant="light">
            <NodeIcon size={14} />
          </ThemeIcon>
          <Text size="sm" fw={600} flex={1}>
            {t(`editor.types.${nodeType}`)}
          </Text>
          {id === startNodeId && (
            <Badge size="xs" color="green">
              {t("editor.start")}
            </Badge>
          )}
        </Group>
        {summaryOf(data) && (
          <Text size="xs" c="dimmed" style={{ whiteSpace: "pre-wrap" }}>
            {summaryOf(data)}
          </Text>
        )}
      </Stack>
      {outputs.map((output) => (
        <Box
          key={output.id}
          pos="relative"
          px="xs"
          py={4}
          style={{ borderTop: "1px solid var(--mantine-color-gray-2)" }}
        >
          <Text size="xs" ta="right" truncate>
            {output.label ?? t(output.labelKey ?? "")}
          </Text>
          <Handle
            type="source"
            id={output.id}
            position={Position.Right}
            style={{ top: "50%" }}
          />
        </Box>
      ))}
    </Paper>
  );
};
