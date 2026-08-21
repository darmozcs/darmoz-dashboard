import type { Aplication } from "@/models";
import { Button, Modal, NumberInput, Stack, Text } from "@mantine/core";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEditApplicationLimitForm } from "../../hooks/useEditApplicationLimitForm/useEditApplicationLimitForm";

interface EditApplicationLimitModalProps {
  application: Aplication | null;
  onClose: () => void;
}

export const EditApplicationLimitModal = ({
  application,
  onClose,
}: EditApplicationLimitModalProps) => {
  const { t } = useTranslation("applications");
  const { form, onSubmit, isLoading } = useEditApplicationLimitForm(
    application,
    onClose,
  );

  return (
    <Modal
      opened={application !== null}
      onClose={onClose}
      title={t("editLimitTitle", "Edit unverified login limit")}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack>
          <Text size="sm" c="dimmed">
            {application?.name}
          </Text>
          <Controller
            name="unverifiedLoginLimit"
            control={form.control}
            render={({ field }) => (
              <NumberInput
                label={t("master.unverifiedLoginLimit", "Unverified login limit")}
                min={0}
                allowDecimal={false}
                allowNegative={false}
                {...field}
                error={form.formState.errors.unverifiedLoginLimit?.message}
              />
            )}
          />
          <Button type="submit" loading={isLoading}>
            {t("editLimitSave", "Save")}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
