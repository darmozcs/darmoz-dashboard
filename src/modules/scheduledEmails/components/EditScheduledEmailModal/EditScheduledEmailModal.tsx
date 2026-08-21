import { useEmailTemplatesQuery } from "@/DAL";
import type { ScheduledEmail } from "@/models";
import { MailClientApplicationSelect } from "@/modules/common/components";
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Controller, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEditScheduledEmailForm } from "../../hooks/useEditScheduledEmailForm/useEditScheduledEmailForm";

interface EditScheduledEmailModalProps {
  scheduledEmail: ScheduledEmail | null;
  onClose: () => void;
}

export const EditScheduledEmailModal = ({
  scheduledEmail,
  onClose,
}: EditScheduledEmailModalProps) => {
  const { t } = useTranslation("scheduledEmails");
  const { form, onSubmit, isLoading } = useEditScheduledEmailForm(
    scheduledEmail,
    onClose,
  );
  const { data: templatesData } = useEmailTemplatesQuery({ active: true });
  const templates = templatesData?.data ?? [];
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variables",
  });

  return (
    <Modal
      opened={scheduledEmail !== null}
      onClose={onClose}
      title={t("editTitle", "Edit scheduled email")}
      size="lg"
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack>
          <Controller
            name="recipient"
            control={form.control}
            render={({ field }) => (
              <TextInput
                label={t("master.recipient", "Recipient")}
                {...field}
                error={form.formState.errors.recipient?.message}
              />
            )}
          />
          <Controller
            name="clientId"
            control={form.control}
            render={({ field }) => (
              <MailClientApplicationSelect
                activeOnly
                label={t("master.application", "Application")}
                {...field}
                error={form.formState.errors.clientId?.message}
              />
            )}
          />
          <Controller
            name="scheduledAt"
            control={form.control}
            render={({ field }) => (
              <DateTimePicker
                label={t("master.scheduledAt", "Scheduled for")}
                clearable
                {...field}
                error={form.formState.errors.scheduledAt?.message}
              />
            )}
          />
          <Controller
            name="templateCode"
            control={form.control}
            render={({ field }) => (
              <Select
                label={t("master.templateCode", "Template")}
                description={t(
                  "templateOrBodyHint",
                  "Choose a template or write a body override below",
                )}
                data={templates.map((template) => ({
                  value: template.code,
                  label: `${template.name} (${template.code})`,
                }))}
                clearable
                {...field}
                error={form.formState.errors.templateCode?.message}
              />
            )}
          />
          <Controller
            name="subject"
            control={form.control}
            render={({ field }) => (
              <TextInput
                label={t("master.subject", "Subject override (optional)")}
                {...field}
                error={form.formState.errors.subject?.message}
              />
            )}
          />
          <Controller
            name="bodyOverride"
            control={form.control}
            render={({ field }) => (
              <Textarea
                label={t("master.bodyOverride", "Body override (optional)")}
                autosize
                minRows={3}
                {...field}
                error={form.formState.errors.bodyOverride?.message}
              />
            )}
          />

          <Stack gap="xs">
            <Group justify="space-between">
              <Text size="sm" fw={500}>
                {t("master.variables", "Variables")}
              </Text>
              <ActionIcon
                variant="subtle"
                onClick={() => append({ name: "", value: "" })}
              >
                <IconPlus size={16} />
              </ActionIcon>
            </Group>
            {fields.map((item, index) => (
              <Group key={item.id} gap="xs" wrap="nowrap">
                <Controller
                  name={`variables.${index}.name`}
                  control={form.control}
                  render={({ field }) => (
                    <TextInput
                      placeholder={t("variableName", "Name")}
                      style={{ flex: 1 }}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name={`variables.${index}.value`}
                  control={form.control}
                  render={({ field }) => (
                    <TextInput
                      placeholder={t("variableValue", "Value")}
                      style={{ flex: 1 }}
                      {...field}
                    />
                  )}
                />
                <ActionIcon
                  variant="subtle"
                  color="red"
                  onClick={() => remove(index)}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ))}
          </Stack>

          <Button type="submit" loading={isLoading}>
            {t("editSave", "Save")}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
