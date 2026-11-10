import {
  useApplicationsQuery,
  useCreateWaBotMutation,
  useDeleteWaBotMutation,
  useWaBotsQuery,
} from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { WaBot } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DEFAULT_SESSION_TIMEOUT_MINUTES } from "../../const/waBots.const";
import {
  createWaBotSchema,
  type CreateWaBotFormData,
} from "../../schemas/waBot.schema";

export const useWaBotsMaster = () => {
  const { t } = useTranslation("whatsapp");
  const navigate = useNavigate();
  const [createOpen, setCreateOpen] = useState(false);

  const bots = useWaBotsQuery();
  const applications = useApplicationsQuery();
  const createMutation = useCreateWaBotMutation();
  const deleteMutation = useDeleteWaBotMutation();

  const applicationNames = new Map(
    (applications.data?.data ?? []).map((app) => [app.id, app.name]),
  );

  const createForm = useForm<CreateWaBotFormData>({
    resolver: yupResolver(createWaBotSchema),
    defaultValues: { name: "", applicationId: "" },
  });

  const notifyError = (error: unknown) =>
    notifications.show({
      color: "red",
      title: t("notifications.error"),
      message: extractErrorMessage(error, t("notifications.saveFailed")),
    });

  const openBot = (bot: WaBot) =>
    navigate({ to: "/whatsapp/bots/$botId", params: { botId: bot.id } });

  const create = (data: CreateWaBotFormData) =>
    createMutation.mutate(
      {
        ...data,
        active: true,
        entryFlowId: null,
        fallbackMessage: null,
        sessionTimeoutMinutes: DEFAULT_SESSION_TIMEOUT_MINUTES,
        businessHours: null,
        outOfHoursMessage: null,
        staticVariables: null,
      },
      {
        onSuccess: (response) => {
          createForm.reset();
          setCreateOpen(false);
          openBot(response.data);
        },
        onError: notifyError,
      },
    );

  return {
    bots: bots.data?.data ?? [],
    isLoading: bots.isLoading,
    applicationName: (id: string) => applicationNames.get(id) ?? id,
    createOpen,
    openCreate: () => setCreateOpen(true),
    closeCreate: () => setCreateOpen(false),
    createForm,
    create,
    isCreating: createMutation.isPending,
    openBot,
    remove: (bot: WaBot) =>
      deleteMutation.mutate(bot.id, { onError: notifyError }),
  };
};
