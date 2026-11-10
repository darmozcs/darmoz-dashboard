import type { WaFlowSummary } from "@/models";
import { Group, Select, Stack, Text, Textarea } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { HTTP_METHODS } from "../../../const/nodeTypes.const";
import { DataText, str, type NodeEditorProps } from "../shared/fields";
import { KeyValueEditor } from "../shared/KeyValueEditor";

export const HttpEditor = (editor: NodeEditorProps) => {
  const { t } = useTranslation("whatsapp");
  const method = str(editor.data.method) || "GET";

  return (
    <Stack gap="xs">
      <Text size="xs" c="dimmed">{t("editor.httpHelp")}</Text>
      <Group gap={4} align="flex-end" wrap="nowrap">
        <Select
          size="xs"
          w={90}
          label={t("editor.fields.method")}
          data={[...HTTP_METHODS]}
          value={method}
          onChange={(value) => editor.onChange({ method: value ?? "GET" })}
        />
        <DataText field="path" editor={editor} label={t("editor.fields.path")} flex={1} placeholder="/clientes?tel={{contact.waId}}" />
      </Group>
      {method !== "GET" && (
        <Textarea
          size="xs"
          label={t("editor.fields.body")}
          description={t("editor.fields.bodyHint")}
          autosize
          minRows={3}
          styles={{ input: { fontFamily: "monospace" } }}
          value={str(editor.data.body)}
          onChange={(event) => editor.onChange({ body: event.currentTarget.value })}
        />
      )}
      <KeyValueEditor
        label={t("editor.fields.headers")}
        value={editor.data.headers}
        keyPlaceholder="Header"
        valuePlaceholder={t("editor.fields.value")}
        onChange={(headers) => editor.onChange({ headers })}
      />
      <DataText field="saveAs" editor={editor} label={t("editor.fields.saveAs")} description={t("editor.fields.httpSaveAsHint", { example: "{{api.total}}" })} />
      <KeyValueEditor
        label={t("editor.fields.mappings")}
        value={editor.data.mappings}
        keyPlaceholder="variable"
        valuePlaceholder="$.total"
        onChange={(mappings) => editor.onChange({ mappings })}
      />
    </Stack>
  );
};

interface GotoFlowEditorProps extends NodeEditorProps {
  flows: WaFlowSummary[];
}

export const GotoFlowEditor = ({ flows, ...editor }: GotoFlowEditorProps) => {
  const { t } = useTranslation("whatsapp");
  return (
    <Select
      size="xs"
      label={t("editor.fields.targetFlow")}
      description={t("editor.fields.targetFlowHint")}
      data={flows.map((flow) => ({ value: flow.id, label: flow.name }))}
      value={str(editor.data.flowId) || null}
      onChange={(flowId) => editor.onChange({ flowId })}
    />
  );
};
