import type { WaAccount } from "@/models";
import { Button, Modal, Stack, Text } from "@mantine/core";
import type { Control, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEditWaAccountForm } from "../../hooks/useWaAccountForms/useEditWaAccountForm";
import type { CreateWaAccountFormData } from "../../schemas/waAccount.schema";
import { WaAccountFields } from "../WaAccountFields/WaAccountFields";

interface EditWaAccountModalProps {
  account: WaAccount | null;
  onClose: () => void;
}

export const EditWaAccountModal = ({
  account,
  onClose,
}: EditWaAccountModalProps) => {
  const { t } = useTranslation("whatsapp");
  const { form, onSubmit, isLoading } = useEditWaAccountForm(account, onClose);

  return (
    <Modal
      opened={account !== null}
      onClose={onClose}
      title={t("accounts.editTitle")}
      size="lg"
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack>
          <Text size="xs" c="dimmed">
            {t("accounts.currentToken", {
              value: account?.accessTokenMasked ?? "—",
            })}
          </Text>
          {/* Mismo shape que el alta; solo cambia la validación de los secretos. */}
          <WaAccountFields
            control={form.control as unknown as Control<CreateWaAccountFormData>}
            errors={form.formState.errors as FieldErrors<CreateWaAccountFormData>}
            secretsOptional
          />
          <Button type="submit" loading={isLoading}>
            {t("common.save")}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
