import type { Aplication } from "@/models";
import {
  Button,
  Modal,
  NumberInput,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEditApplicationForm } from "../../hooks/useEditApplicationForm/useEditApplicationForm";

interface EditApplicationModalProps {
  application: Aplication | null;
  onClose: () => void;
}

export const EditApplicationModal = ({
  application,
  onClose,
}: EditApplicationModalProps) => {
  const { t } = useTranslation("applications");
  const { form, onSubmit, isLoading } = useEditApplicationForm(
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
            {t("editSave", "Save")}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
