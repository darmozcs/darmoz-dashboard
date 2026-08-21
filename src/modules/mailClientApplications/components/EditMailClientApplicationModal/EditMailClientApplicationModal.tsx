import type { MailClientApplication } from "@/models";
import {
  Button,
  CopyButton,
  Group,
  Modal,
  Stack,
  Switch,
  Text,
  TextInput,
} from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEditMailClientApplicationForm } from "../../hooks/useEditMailClientApplicationForm/useEditMailClientApplicationForm";

interface EditMailClientApplicationModalProps {
  application: MailClientApplication | null;
  onClose: () => void;
}

export const EditMailClientApplicationModal = ({
  application,
  onClose,
}: EditMailClientApplicationModalProps) => {
  const { t } = useTranslation("mailApplications");
  const { form, onSubmit, isLoading } = useEditMailClientApplicationForm(
    application,
    onClose,
  );

  return (
    <Modal
      opened={application !== null}
      onClose={onClose}
      title={t("editTitle", "Edit application")}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack>
          <Group gap="xs" align="center">
            <Text size="sm" c="dimmed" style={{ fontFamily: "monospace" }}>
              {application?.id}
            </Text>
            <CopyButton value={application?.id ?? ""}>
              {({ copied, copy }) => (
                <Button
                  size="compact-xs"
                  variant="subtle"
                  color={copied ? "green" : "gray"}
                  onClick={copy}
                  leftSection={
                    copied ? <IconCheck size={14} /> : <IconCopy size={14} />
                  }
                >
                  {copied ? t("copied", "Copied") : t("copyId", "Copy ID")}
                </Button>
              )}
            </CopyButton>
          </Group>
          <Controller
            name="name"
            control={form.control}
            render={({ field }) => (
              <TextInput
                label={t("master.name", "Name")}
                {...field}
                error={form.formState.errors.name?.message}
              />
            )}
          />
          <Controller
            name="active"
            control={form.control}
            render={({ field: { value, onChange, ...field } }) => (
              <Switch
                label={t("master.active", "Active")}
                checked={value}
                onChange={(event) => onChange(event.currentTarget.checked)}
                {...field}
              />
            )}
          />
          <Button type="submit" loading={isLoading}>
            {t("editSave", "Save")}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
