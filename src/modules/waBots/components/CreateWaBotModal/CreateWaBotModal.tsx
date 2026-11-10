import { ApplicationSelect } from "@/modules/common/components";
import { Button, Modal, Stack, Text, TextInput } from "@mantine/core";
import { Controller, type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { CreateWaBotFormData } from "../../schemas/waBot.schema";

interface CreateWaBotModalProps {
  opened: boolean;
  form: UseFormReturn<CreateWaBotFormData>;
  isLoading: boolean;
  onSubmit: (data: CreateWaBotFormData) => void;
  onClose: () => void;
}

export const CreateWaBotModal = ({
  opened,
  form,
  isLoading,
  onSubmit,
  onClose,
}: CreateWaBotModalProps) => {
  const { t } = useTranslation("whatsapp");
  const errors = form.formState.errors;

  return (
    <Modal opened={opened} onClose={onClose} title={t("bots.createTitle")}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack>
          <Text size="sm" c="dimmed">
            {t("bots.createHelp")}
          </Text>
          <Controller
            name="name"
            control={form.control}
            render={({ field }) => (
              <TextInput
                label={t("bots.name")}
                withAsterisk
                {...field}
                error={errors.name?.message && t(errors.name.message)}
              />
            )}
          />
          <Controller
            name="applicationId"
            control={form.control}
            render={({ field }) => (
              <ApplicationSelect
                label={t("bots.application")}
                withAsterisk
                {...field}
                error={errors.applicationId?.message && t(errors.applicationId.message)}
              />
            )}
          />
          <Button type="submit" loading={isLoading}>
            {t("bots.create")}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
