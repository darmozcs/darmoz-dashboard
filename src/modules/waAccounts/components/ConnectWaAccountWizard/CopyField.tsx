import { ActionIcon, CopyButton, TextInput, Tooltip } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface CopyFieldProps {
  label: string;
  value: string;
}

export const CopyField = ({ label, value }: CopyFieldProps) => {
  const { t } = useTranslation("whatsapp");

  return (
    <TextInput
      label={label}
      value={value}
      readOnly
      styles={{ input: { fontFamily: "monospace" } }}
      rightSection={
        <CopyButton value={value}>
          {({ copied, copy }) => (
            <Tooltip label={copied ? t("common.copied") : t("common.copy")}>
              <ActionIcon
                variant="subtle"
                color={copied ? "green" : "gray"}
                onClick={copy}
              >
                {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      }
    />
  );
};
