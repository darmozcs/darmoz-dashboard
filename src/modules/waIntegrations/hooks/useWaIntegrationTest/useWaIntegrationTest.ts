import { useTestWaIntegrationMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { WaIntegration } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  SUCCESS_STATUS_MAX,
  SUCCESS_STATUS_MIN,
} from "../../const/waIntegrations.const";
import {
  waIntegrationTestSchema,
  type WaIntegrationTestFormData,
} from "../../schemas/waIntegration.schema";

export const useWaIntegrationTest = (integration: WaIntegration | null) => {
  const { t } = useTranslation("whatsapp");
  const testMutation = useTestWaIntegrationMutation();

  const form = useForm<WaIntegrationTestFormData>({
    resolver: yupResolver(waIntegrationTestSchema),
    defaultValues: { method: "GET", path: "/" },
  });

  const handleSubmit = (data: WaIntegrationTestFormData) => {
    if (!integration) return;
    testMutation.mutate(
      { id: integration.id, payload: data },
      {
        onError: (error: unknown) =>
          notifications.show({
            color: "red",
            title: t("notifications.error"),
            message: extractErrorMessage(error, t("integrations.testFailed")),
          }),
      },
    );
  };

  const result = testMutation.data?.data ?? null;

  return {
    form,
    onSubmit: handleSubmit,
    isLoading: testMutation.isPending,
    result,
    isSuccess:
      result !== null &&
      result.status >= SUCCESS_STATUS_MIN &&
      result.status <= SUCCESS_STATUS_MAX,
    reset: testMutation.reset,
  };
};
