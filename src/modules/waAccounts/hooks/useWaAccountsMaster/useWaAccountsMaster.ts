import { useDeleteWaAccountMutation, useWaAccountsQuery } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { WaAccount } from "@/models";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Estado compartido por el header (alta) y la tabla (editar / conectar / borrar).
export const useWaAccountsMaster = () => {
  const { t } = useTranslation("whatsapp");
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<WaAccount | null>(null);
  const [connecting, setConnecting] = useState<WaAccount | null>(null);

  const { data, isLoading } = useWaAccountsQuery();
  const deleteMutation = useDeleteWaAccountMutation();

  const handleDelete = (account: WaAccount) => {
    deleteMutation.mutate(account.id, {
      onSuccess: () =>
        notifications.show({
          color: "green",
          title: t("notifications.success"),
          message: t("accounts.deleted"),
        }),
      onError: (error: unknown) =>
        notifications.show({
          color: "red",
          title: t("notifications.error"),
          message: extractErrorMessage(error, t("notifications.deleteFailed")),
        }),
    });
  };

  return {
    accounts: data?.data ?? [],
    isLoading,
    createOpen,
    openCreate: () => setCreateOpen(true),
    closeCreate: () => setCreateOpen(false),
    // Recién creada: se abre directo el asistente de conexión.
    onCreated: (account: WaAccount) => {
      setCreateOpen(false);
      setConnecting(account);
    },
    editing,
    setEditing,
    connecting,
    setConnecting,
    handleDelete,
  };
};
