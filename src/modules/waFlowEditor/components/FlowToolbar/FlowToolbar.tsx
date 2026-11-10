import { Badge, Button, Group } from "@mantine/core";
import {
  IconChecklist,
  IconDeviceFloppy,
  IconRocket,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import type { FlowEditorState } from "../../hooks/useFlowEditor/useFlowEditor";

interface FlowToolbarProps {
  editor: FlowEditorState;
}

export const FlowToolbar = ({ editor }: FlowToolbarProps) => {
  const { t } = useTranslation("whatsapp");
  const flow = editor.flow;

  return (
    <Group gap="xs" wrap="wrap">
      {flow?.publishedVersion ? (
        <Badge variant="light" color="green">
          {t("editor.publishedVersion", { version: flow.publishedVersion })}
        </Badge>
      ) : (
        <Badge variant="light" color="gray">
          {t("flows.notPublished")}
        </Badge>
      )}
      {editor.isDirty && (
        <Badge variant="light" color="yellow">
          {t("editor.unsaved")}
        </Badge>
      )}
      <Button
        variant="default"
        size="xs"
        leftSection={<IconDeviceFloppy size={14} />}
        onClick={editor.save}
        loading={editor.isSaving}
      >
        {t("editor.saveDraft")}
      </Button>
      <Button
        variant="default"
        size="xs"
        leftSection={<IconChecklist size={14} />}
        onClick={editor.validate}
        loading={editor.isValidating}
      >
        {t("editor.validate")}
      </Button>
      <Button
        size="xs"
        leftSection={<IconRocket size={14} />}
        onClick={editor.publish}
        loading={editor.isPublishing}
      >
        {t("editor.publish")}
      </Button>
    </Group>
  );
};
