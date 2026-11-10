import {
  useApplicationsQuery,
  useCreateWaIntegrationMutation,
  useUpdateWaIntegrationMutation,
} from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { WaIntegration } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DEFAULT_TIMEOUT_MS } from "../../const/waIntegrations.const";
import {
  waIntegrationSchema,
  type WaIntegrationFormData,
} from "../../schemas/waIntegration.schema";

// integration null = alta; con valor = edición del existente.
export const useWaIntegrationForm = (
  integration: WaIntegration | null,
  onSaved: () => void,
) => {
  const { t } = useTranslation("whatsapp");
  const applications = useApplicationsQuery();
  const createMutation = useCreateWaIntegrationMutation();
  const updateMutation = useUpdateWaIntegrationMutation();

  const form = useForm<WaIntegrationFormData>({
    resolver: yupResolver(waIntegrationSchema),
    values: {
      applicationId: integration?.applicationId ?? "",
      baseUrl: integration?.baseUrl ?? "",
      authHeaderName: integration?.authHeaderName ?? "X-Api-Key",
      authHeaderValue: "",
      timeoutMs: integration?.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    },
  });

  const callbacks = {
    onSuccess: () => {
      notifications.show({
        color: "green",
        title: t("notifications.success"),
        message: t("integrations.saved"),
      });
      onSaved();
    },
    onError: (error: unknown) =>
      notifications.show({
        color: "red",
        title: t("notifications.error"),
        message: extractErrorMessage(error, t("notifications.saveFailed")),
      }),
  };

  const handleSubmit = (data: WaIntegrationFormData) => {
    const applicationName =
      (applications.data?.data ?? []).find((app) => app.id === data.applicationId)
        ?.name ?? data.applicationId;
    const payload = {
      applicationName,
      baseUrl: data.baseUrl,
      authHeaderName: data.authHeaderName || undefined,
      authHeaderValue: data.authHeaderValue || undefined,
      timeoutMs: data.timeoutMs,
    };
    if (integration) {
      updateMutation.mutate(
        {
          id: integration.id,
          payload: { ...payload, clearAuthHeader: !data.authHeaderName },
        },
        callbacks,
      );
    } else {
      createMutation.mutate(
        { ...payload, applicationId: data.applicationId },
        callbacks,
      );
    }
  };

  return {
    form,
    onSubmit: handleSubmit,
    isLoading: createMutation.isPending || updateMutation.isPending,
  };
};
