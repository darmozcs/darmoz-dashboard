import { ActionIcon, Button, Group, Stack, Text, TextInput } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface KeyValueEditorProps {
  label: string;
  value: unknown;
  keyPlaceholder: string;
  valuePlaceholder: string;
  onChange: (value: Record<string, string>) => void;
}

const toEntries = (value: unknown): [string, string][] =>
  value && typeof value === "object"
    ? Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, String(v ?? "")])
    : [];

// Headers del nodo http y mapeos variable -> JsonPath. Se guarda como objeto.
export const KeyValueEditor = ({
  label,
  value,
  keyPlaceholder,
  valuePlaceholder,
  onChange,
}: KeyValueEditorProps) => {
  const { t } = useTranslation("whatsapp");
  const entries = toEntries(value);
  const save = (next: [string, string][]) => onChange(Object.fromEntries(next));

  return (
    <Stack gap={6}>
      <Text size="xs" fw={500}>
        {label}
      </Text>
      {entries.map(([key, val], index) => (
        <Group key={index} gap={4} wrap="nowrap">
          <TextInput
            size="xs"
            w={110}
            placeholder={keyPlaceholder}
            value={key}
            onChange={(event) =>
              save(entries.map((entry, i) => (i === index ? [event.currentTarget.value, entry[1]] : entry)))
            }
          />
          <TextInput
            size="xs"
            flex={1}
            placeholder={valuePlaceholder}
            value={val}
            onChange={(event) =>
              save(entries.map((entry, i) => (i === index ? [entry[0], event.currentTarget.value] : entry)))
            }
          />
          <ActionIcon
            variant="subtle"
            color="red"
            size="sm"
            onClick={() => save(entries.filter((_, i) => i !== index))}
          >
            <IconTrash size={14} />
          </ActionIcon>
        </Group>
      ))}
      <Group>
        <Button
          size="compact-xs"
          variant="light"
          leftSection={<IconPlus size={12} />}
          // Clave vacía temporal; si se repite, Object.fromEntries se queda con la última.
          onClick={() => save([...entries, [`${keyPlaceholder}${entries.length + 1}`, ""]])}
        >
          {t("editor.addRow")}
        </Button>
      </Group>
    </Stack>
  );
};
