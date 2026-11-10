import type { WaPhoneNumber } from "@/models";
import { Button, Modal, Stack, TextInput, Textarea } from "@mantine/core";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useTestMessageForm } from "../../hooks/useTestMessageForm/useTestMessageForm";

interface TestMessageModalProps {
  phone: WaPhoneNumber | null;
  onClose: () => void;
}

export const TestMessageModal = ({ phone, onClose }: TestMessageModalProps) => {
  const { t } = useTranslation("whatsapp");
  const { form, onSubmit, isLoading } = useTestMessageForm(phone, onClose);
  const errors = form.formState.errors;

  return (
    <Modal
      opened={phone !== null}
      onClose={onClose}
      title={t("numbers.testTitle", { number: phone?.displayNumber ?? "" })}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack>
          <Controller
            name="to"
            control={form.control}
            render={({ field }) => (
              <TextInput
                label={t("connect.test.to")}
                description={t("connect.test.toHint")}
                {...field}
                error={errors.to?.message && t(errors.to.message)}
              />
            )}
          />
          <Controller
            name="text"
            control={form.control}
            render={({ field }) => (
              <Textarea
                label={t("connect.test.text")}
                autosize
                minRows={2}
                {...field}
                error={errors.text?.message && t(errors.text.message)}
              />
            )}
          />
          <Button type="submit" loading={isLoading}>
            {t("connect.test.action")}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
