import { ActionIcon, Button, Group, Stack, Text, TextInput } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { newOptionId } from "../../../const/nodeTypes.const";

export interface Option {
  id: string;
  title: string;
  description?: string;
}

interface OptionsEditorProps {
  label: string;
  options: Option[];
  max: number;
  maxTitle: number;
  withDescription?: boolean;
  onChange: (options: Option[]) => void;
}

// Botones o filas de lista: cada opción es una salida del nodo (su id).
export const OptionsEditor = ({
  label,
  options,
  max,
  maxTitle,
  withDescription = false,
  onChange,
}: OptionsEditorProps) => {
  const { t } = useTranslation("whatsapp");
  const update = (index: number, patch: Partial<Option>) =>
    onChange(options.map((option, i) => (i === index ? { ...option, ...patch } : option)));

  return (
    <Stack gap={6}>
      <Text size="xs" fw={500}>
        {label} ({options.length}/{max})
      </Text>
      {options.map((option, index) => (
        <Stack key={option.id} gap={2}>
          <Group gap={4} wrap="nowrap">
            <TextInput
              size="xs"
              flex={1}
              placeholder={t("editor.optionTitle", { max: maxTitle })}
              maxLength={maxTitle}
              value={option.title}
              onChange={(event) => update(index, { title: event.currentTarget.value })}
            />
            <ActionIcon
              variant="subtle"
              color="red"
              size="sm"
              disabled={options.length === 1}
              onClick={() => onChange(options.filter((_, i) => i !== index))}
            >
              <IconTrash size={14} />
            </ActionIcon>
          </Group>
          {withDescription && (
            <TextInput
              size="xs"
              placeholder={t("editor.optionDescription")}
              value={option.description ?? ""}
              onChange={(event) =>
                update(index, { description: event.currentTarget.value })
              }
            />
          )}
        </Stack>
      ))}
      <Group>
        <Button
          size="compact-xs"
          variant="light"
          leftSection={<IconPlus size={12} />}
          disabled={options.length >= max}
          onClick={() => onChange([...options, { id: newOptionId(), title: "" }])}
        >
          {t("editor.addOption")}
        </Button>
      </Group>
    </Stack>
  );
};
