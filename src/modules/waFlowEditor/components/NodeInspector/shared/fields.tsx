import { TextInput, Textarea, type TextInputProps } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { VARIABLE_EXAMPLES } from "../../../const/nodeTypes.const";

export interface NodeEditorProps {
  data: Record<string, unknown>;
  onChange: (patch: Record<string, unknown>) => void;
}

export const str = (value: unknown) => (typeof value === "string" ? value : "");

interface DataTextProps extends Omit<TextInputProps, "onChange" | "value"> {
  field: string;
  editor: NodeEditorProps;
}

// Input de texto atado a una clave del data del nodo.
export const DataText = ({ field, editor, ...rest }: DataTextProps) => (
  <TextInput
    size="xs"
    value={str(editor.data[field])}
    onChange={(event) => editor.onChange({ [field]: event.currentTarget.value })}
    {...rest}
  />
);

interface TemplateTextProps {
  field: string;
  editor: NodeEditorProps;
  label: string;
  maxLength?: number;
  required?: boolean;
}

// Textos que admiten {{variables}}.
export const TemplateText = ({ field, editor, label, maxLength, required }: TemplateTextProps) => {
  const { t } = useTranslation("whatsapp");

  return (
    <Textarea
      size="xs"
      label={label}
      description={t("editor.variablesHint", VARIABLE_EXAMPLES)}
      withAsterisk={required}
      autosize
      minRows={3}
      maxLength={maxLength}
      value={str(editor.data[field])}
      onChange={(event) => editor.onChange({ [field]: event.currentTarget.value })}
    />
  );
};
