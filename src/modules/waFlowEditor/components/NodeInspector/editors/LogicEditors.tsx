import { ActionIcon, Button, Group, Select, Stack, Text, TextInput } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import {
  CONDITION_OPERATORS,
  LIMITS,
  OPERATORS_WITHOUT_VALUE,
  QUESTION_VALIDATIONS,
  VARIABLE_EXAMPLES,
  newOptionId,
} from "../../../const/nodeTypes.const";
import { DataText, TemplateText, str, type NodeEditorProps } from "../shared/fields";

interface Rule {
  id: string;
  variable: string;
  operator: string;
  value?: string;
}

export const QuestionEditor = (editor: NodeEditorProps) => {
  const { t } = useTranslation("whatsapp");
  const validation = str(editor.data.validation) || "text";

  return (
    <Stack gap="xs">
      <TemplateText field="text" editor={editor} label={t("editor.fields.question")} maxLength={LIMITS.TEXT} required />
      <DataText field="saveAs" editor={editor} label={t("editor.fields.saveAs")} description={t("editor.fields.saveAsHint", { example: "{{nombre}}" })} withAsterisk />
      <Select
        size="xs"
        label={t("editor.fields.validation")}
        data={QUESTION_VALIDATIONS.map((value) => ({ value, label: t(`editor.validations.${value}`) }))}
        value={validation}
        onChange={(value) => editor.onChange({ validation: value })}
      />
      {validation === "regex" && (
        <DataText field="pattern" editor={editor} label={t("editor.fields.pattern")} />
      )}
      <DataText field="errorMessage" editor={editor} label={t("editor.fields.errorMessage")} description={t("editor.fields.errorMessageHint")} />
    </Stack>
  );
};

export const ConditionEditor = (editor: NodeEditorProps) => {
  const { t } = useTranslation("whatsapp");
  const rules = (Array.isArray(editor.data.rules) ? editor.data.rules : []) as Rule[];
  const save = (next: Rule[]) => editor.onChange({ rules: next });
  const update = (index: number, patch: Partial<Rule>) =>
    save(rules.map((rule, i) => (i === index ? { ...rule, ...patch } : rule)));

  return (
    <Stack gap="xs">
      <Text size="xs" c="dimmed">{t("editor.conditionHelp")}</Text>
      {rules.map((rule, index) => (
        <Stack key={rule.id} gap={4} p={6} style={{ border: "1px solid var(--mantine-color-gray-3)", borderRadius: 6 }}>
          <Group gap={4} wrap="nowrap">
            <TextInput size="xs" flex={1} placeholder={t("editor.fields.variable")} value={rule.variable}
              onChange={(event) => update(index, { variable: event.currentTarget.value })} />
            <ActionIcon variant="subtle" color="red" size="sm" disabled={rules.length === 1}
              onClick={() => save(rules.filter((_, i) => i !== index))}>
              <IconTrash size={14} />
            </ActionIcon>
          </Group>
          <Group gap={4} wrap="nowrap">
            <Select size="xs" w={130} value={rule.operator}
              data={CONDITION_OPERATORS.map((value) => ({ value, label: t(`editor.operators.${value}`) }))}
              onChange={(value) => update(index, { operator: value ?? "eq" })} />
            {!OPERATORS_WITHOUT_VALUE.includes(rule.operator) && (
              <TextInput size="xs" flex={1} placeholder={t("editor.fields.value")} value={rule.value ?? ""}
                onChange={(event) => update(index, { value: event.currentTarget.value })} />
            )}
          </Group>
        </Stack>
      ))}
      <Group>
        <Button size="compact-xs" variant="light" leftSection={<IconPlus size={12} />}
          onClick={() => save([...rules, { id: newOptionId(), variable: "", operator: "eq", value: "" }])}>
          {t("editor.addRule")}
        </Button>
      </Group>
    </Stack>
  );
};

export const SetVariableEditor = (editor: NodeEditorProps) => {
  const { t } = useTranslation("whatsapp");
  return (
    <Stack gap="xs">
      <DataText field="variable" editor={editor} label={t("editor.fields.variable")} withAsterisk />
      <DataText field="value" editor={editor} label={t("editor.fields.value")} description={t("editor.variablesHint", VARIABLE_EXAMPLES)} />
    </Stack>
  );
};

export const TextOnlyEditor = (editor: NodeEditorProps) => {
  const { t } = useTranslation("whatsapp");
  return <TemplateText field="text" editor={editor} label={t("editor.fields.finalText")} maxLength={LIMITS.TEXT} />;
};
