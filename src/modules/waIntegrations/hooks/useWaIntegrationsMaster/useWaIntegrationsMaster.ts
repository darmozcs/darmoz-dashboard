import { useDeleteWaIntegrationMutation, useWaIntegrationsQuery } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { WaIntegration } from "@/models";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useWaIntegrationsMaster = () => {
  const { t } = useTranslation("whatsapp");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<WaIntegration | null>(null);
  const [testing, setTesting] = useState<WaIntegration | null>(null);

  const { data, isLoading } = useWaIntegrationsQuery();
  const deleteMutation = useDeleteWaIntegrationMutation();

  return {
    integrations: data?.data ?? [],
    isLoading,
    formOpen,
    editing,
    openCreate: () => {
      setEditing(null);
      setFormOpen(true);
    },
    openEdit: (integration: WaIntegration) => {
      setEditing(integration);
      setFormOpen(true);
    },
    closeForm: () => {
      setFormOpen(false);
      setEditing(null);
    },
    testing,
    setTesting,
    handleDelete: (integration: WaIntegration) =>
      deleteMutation.mutate(integration.id, {
        onError: (error: unknown) =>
          notifications.show({
            color: "red",
            title: t("notifications.error"),
            message: extractErrorMessage(error, t("notifications.deleteFailed")),
          }),
      }),
  };
};
