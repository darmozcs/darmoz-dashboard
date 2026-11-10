import {
  useCreateWaFlowMutation,
  useDeleteWaFlowMutation,
  useWaBotQuery,
  useWaFlowsQuery,
} from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { WaFlowSummary } from "@/models";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useWaBotFlows = (botId: string) => {
  const { t } = useTranslation("whatsapp");
  const navigate = useNavigate();
  const [newFlowName, setNewFlowName] = useState("");

  const bot = useWaBotQuery(botId);
  const flows = useWaFlowsQuery(botId);
  const createMutation = useCreateWaFlowMutation();
  const deleteMutation = useDeleteWaFlowMutation();

  const notifyError = (error: unknown) =>
    notifications.show({
      color: "red",
      title: t("notifications.error"),
      message: extractErrorMessage(error, t("notifications.saveFailed")),
    });

  const openEditor = (flowId: string) =>
    navigate({
      to: "/whatsapp/bots/$botId/flows/$flowId",
      params: { botId, flowId },
    });

  return {
    flows: flows.data?.data ?? [],
    isLoading: flows.isLoading,
    entryFlowId: bot.data?.data.entryFlowId ?? null,
    newFlowName,
    setNewFlowName,
    create: () =>
      createMutation.mutate(
        { botId, name: newFlowName.trim() },
        {
          onSuccess: (response) => {
            setNewFlowName("");
            openEditor(response.data.id);
          },
          onError: notifyError,
        },
      ),
    isCreating: createMutation.isPending,
    openEditor: (flow: WaFlowSummary) => openEditor(flow.id),
    remove: (flow: WaFlowSummary) =>
      deleteMutation.mutate({ botId, flowId: flow.id }, { onError: notifyError }),
  };
};
