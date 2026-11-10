import { Select, Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { LIMITS, MEDIA_TYPES } from "../../../const/nodeTypes.const";
import { DataText, TemplateText, str, type NodeEditorProps } from "../shared/fields";
import { OptionsEditor, type Option } from "../shared/OptionsEditor";

const asOptions = (value: unknown) => (Array.isArray(value) ? (value as Option[]) : []);

export const MessageEditor = (editor: NodeEditorProps) => {
  const { t } = useTranslation("whatsapp");
  const mediaType = str(editor.data.mediaType) || "none";

  return (
    <Stack gap="xs">
      <TemplateText field="text" editor={editor} label={t("editor.fields.text")} maxLength={LIMITS.TEXT} />
      <Select
        size="xs"
        label={t("editor.fields.mediaType")}
        data={MEDIA_TYPES.map((type) => ({ value: type, label: t(`editor.media.${type}`) }))}
        value={mediaType}
        onChange={(value) =>
          editor.onChange({ mediaType: value === "none" ? undefined : value, ...(value === "none" ? { mediaUrl: undefined } : {}) })
        }
      />
      {mediaType !== "none" && (
        <>
          <DataText field="mediaUrl" editor={editor} label={t("editor.fields.mediaUrl")} placeholder="https://" />
          <DataText field="caption" editor={editor} label={t("editor.fields.caption")} />
          {mediaType === "document" && (
            <DataText field="filename" editor={editor} label={t("editor.fields.filename")} />
          )}
        </>
      )}
    </Stack>
  );
};

const InteractiveFrame = (editor: NodeEditorProps) => {
  const { t } = useTranslation("whatsapp");
  return (
    <>
      <DataText field="header" editor={editor} label={t("editor.fields.header")} />
      <TemplateText
        field="text"
        editor={editor}
        label={t("editor.fields.text")}
        maxLength={LIMITS.INTERACTIVE_TEXT}
        required
      />
      <DataText field="footer" editor={editor} label={t("editor.fields.footer")} />
    </>
  );
};

export const ButtonsEditor = (editor: NodeEditorProps) => {
  const { t } = useTranslation("whatsapp");

  return (
    <Stack gap="xs">
      <InteractiveFrame {...editor} />
      <OptionsEditor
        label={t("editor.fields.buttons")}
        options={asOptions(editor.data.buttons)}
        max={LIMITS.BUTTONS}
        maxTitle={LIMITS.BUTTON_TITLE}
        onChange={(buttons) => editor.onChange({ buttons })}
      />
    </Stack>
  );
};

export const ListEditor = (editor: NodeEditorProps) => {
  const { t } = useTranslation("whatsapp");
  // El editor maneja una sola sección (alcanza para la mayoría de los menús).
  const section = (asOptions(editor.data.sections)[0] ?? {}) as { title?: string; rows?: Option[] };

  return (
    <Stack gap="xs">
      <InteractiveFrame {...editor} />
      <DataText
        field="buttonText"
        editor={editor}
        label={t("editor.fields.buttonText")}
        maxLength={LIMITS.BUTTON_TITLE}
        withAsterisk
      />
      <OptionsEditor
        label={t("editor.fields.rows")}
        options={section.rows ?? []}
        max={LIMITS.LIST_ROWS}
        maxTitle={LIMITS.ROW_TITLE}
        withDescription
        onChange={(rows) => editor.onChange({ sections: [{ ...section, rows }] })}
      />
    </Stack>
  );
};
