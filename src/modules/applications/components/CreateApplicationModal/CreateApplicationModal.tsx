import {
  Button,
  Modal,
  NumberInput,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCreateApplicationForm } from "../../hooks/useCreateApplicationForm/useCreateApplicationForm";

interface CreateApplicationModalProps {
  opened: boolean;
  onClose: () => void;
}

export const CreateApplicationModal = ({
  opened,
  onClose,
}: CreateApplicationModalProps) => {
  const { t } = useTranslation("applications");
  const { form, onSubmit, isLoading } = useCreateApplicationForm(onClose);

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
              "createAutoRoleNote",
              "A base USER role will be created automatically for this application.",
            )}
          </Text>
          <Controller
            name="serviceName"
            control={form.control}
            render={({ field }) => (
              <TextInput
                label={t("master.serviceName", "Service name")}
                {...field}
                error={form.formState.errors.serviceName?.message}
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
            name="description"
            control={form.control}
            render={({ field }) => (
              <Textarea
                label={t("master.description", "Description")}
                {...field}
                error={form.formState.errors.description?.message}
              />
            )}
          />
          <Controller
            name="unverifiedLoginLimit"
            control={form.control}
            render={({ field }) => (
              <NumberInput
                label={t(
                  "master.unverifiedLoginLimit",
                  "Unverified login limit",
                )}
                min={0}
                allowDecimal={false}
                allowNegative={false}
                {...field}
                error={form.formState.errors.unverifiedLoginLimit?.message}
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
