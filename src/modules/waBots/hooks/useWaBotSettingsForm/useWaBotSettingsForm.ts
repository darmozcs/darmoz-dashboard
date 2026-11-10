import { useUpdateWaBotMutation, useWaBotQuery, useWaFlowsQuery } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  waBotSettingsSchema,
  type WaBotSettingsFormData,
} from "../../schemas/waBot.schema";
import { toSavePayload, toSettingsForm } from "./botSettingsMapper";

export const useWaBotSettingsForm = (botId: string) => {
  const { t } = useTranslation("whatsapp");
  const bot = useWaBotQuery(botId);
  const flows = useWaFlowsQuery(botId);
  const updateMutation = useUpdateWaBotMutation();

  const form = useForm<WaBotSettingsFormData>({
    resolver: yupResolver(waBotSettingsSchema),
    values: toSettingsForm(bot.data?.data),
  });
  const variables = useFieldArray({ control: form.control, name: "variables" });

  const handleSubmit = (data: WaBotSettingsFormData) =>
    updateMutation.mutate(
      { id: botId, payload: toSavePayload(data) },
      {
        onSuccess: () =>
          notifications.show({
            color: "green",
            title: t("notifications.success"),
            message: t("bots.saved"),
          }),
        onError: (error: unknown) =>
          notifications.show({
            color: "red",
            title: t("notifications.error"),
            message: extractErrorMessage(error, t("notifications.saveFailed")),
          }),
      },
    );

  return {
    form,
    variables,
    onSubmit: handleSubmit,
    isLoading: updateMutation.isPending,
    // Solo los publicados pueden ser de entrada (el motor ejecuta la versión publicada).
    flowOptions: (flows.data?.data ?? []).map((flow) => ({
      value: flow.id,
      label: flow.publishedVersion
        ? flow.name
        : `${flow.name} (${t("flows.notPublished")})`,
      disabled: !flow.publishedVersion,
    })),
  };
};

export type WaBotSettingsFormState = ReturnType<typeof useWaBotSettingsForm>;
