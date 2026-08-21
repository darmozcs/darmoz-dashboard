import { Button, Modal, Stack, Switch, Textarea, TextInput } from "@mantine/core";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCreateEmailTemplateForm } from "../../hooks/useCreateEmailTemplateForm/useCreateEmailTemplateForm";

interface CreateEmailTemplateModalProps {
  opened: boolean;
  onClose: () => void;
}

export const CreateEmailTemplateModal = ({
  opened,
  onClose,
}: CreateEmailTemplateModalProps) => {
  const { t } = useTranslation("emailTemplates");
  const { form, onSubmit, isLoading } = useCreateEmailTemplateForm(onClose);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t("createTitle", "Create template")}
      size="lg"
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack>
          <Controller
            name="code"
            control={form.control}
            render={({ field }) => (
              <TextInput
                label={t("master.code", "Code")}
                description={t(
                  "codeHint",
                  "Used as templateCode when scheduling an email",
                )}
                {...field}
                error={form.formState.errors.code?.message}
              />
            )}
          />
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
            name="subject"
            control={form.control}
            render={({ field }) => (
              <TextInput
                label={t("master.subject", "Subject")}
                description={t(
                  "placeholderHint",
                  "Supports ${variable} placeholders",
                )}
                {...field}
                error={form.formState.errors.subject?.message}
              />
            )}
          />
          <Controller
            name="bodyHtml"
            control={form.control}
            render={({ field }) => (
              <Textarea
                label={t("master.bodyHtml", "HTML body")}
                autosize
                minRows={4}
                {...field}
                error={form.formState.errors.bodyHtml?.message}
              />
            )}
          />
          <Controller
            name="bodyText"
            control={form.control}
            render={({ field }) => (
              <Textarea
                label={t("master.bodyText", "Plain text body (optional)")}
                autosize
                minRows={2}
                {...field}
                error={form.formState.errors.bodyText?.message}
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
            {t("createSave", "Create")}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
