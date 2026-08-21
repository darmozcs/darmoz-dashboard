import { Button, Modal, Stack, Switch, Text, TextInput } from "@mantine/core";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCreateMailClientApplicationForm } from "../../hooks/useCreateMailClientApplicationForm/useCreateMailClientApplicationForm";

interface CreateMailClientApplicationModalProps {
  opened: boolean;
  onClose: () => void;
}

export const CreateMailClientApplicationModal = ({
  opened,
  onClose,
}: CreateMailClientApplicationModalProps) => {
  const { t } = useTranslation("mailApplications");
  const { form, onSubmit, isLoading } =
    useCreateMailClientApplicationForm(onClose);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t("createTitle", "Create application")}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack>
          <Text size="xs" c="dimmed">
            {t(
              "clientIdNote",
              "El ID generado es el valor que esta aplicación debe enviar en el header X-Client-Id para usar la API de envío de correos.",
            )}
          </Text>
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
            {t("createSave", "Create")}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
