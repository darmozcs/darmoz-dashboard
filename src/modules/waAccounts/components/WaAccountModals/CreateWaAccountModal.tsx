import type { WaAccount } from "@/models";
import { Button, Modal, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useCreateWaAccountForm } from "../../hooks/useWaAccountForms/useCreateWaAccountForm";
import { WaAccountFields } from "../WaAccountFields/WaAccountFields";

interface CreateWaAccountModalProps {
  opened: boolean;
  onClose: () => void;
  onCreated: (account: WaAccount) => void;
}

export const CreateWaAccountModal = ({
  opened,
  onClose,
  onCreated,
}: CreateWaAccountModalProps) => {
  const { t } = useTranslation("whatsapp");
  const { form, onSubmit, isLoading } = useCreateWaAccountForm(onCreated);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t("accounts.createTitle")}
      size="lg"
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack>
          <Text size="sm" c="dimmed">
            {t("accounts.createHelp")}
          </Text>
          <WaAccountFields
            control={form.control}
            errors={form.formState.errors}
          />
          <Button type="submit" loading={isLoading}>
            {t("accounts.createAndConnect")}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
