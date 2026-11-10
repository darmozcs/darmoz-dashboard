import { useCreateWaAccountMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { WaAccount } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  createWaAccountSchema,
  type CreateWaAccountFormData,
} from "../../schemas/waAccount.schema";

const DEFAULT_VALUES: CreateWaAccountFormData = {
  name: "",
  appId: "",
  appSecret: "",
  accessToken: "",
  wabaId: "",
  graphApiVersion: "",
  active: true,
};

export const useCreateWaAccountForm = (onSaved: (account: WaAccount) => void) => {
  const { t } = useTranslation("whatsapp");
  const createMutation = useCreateWaAccountMutation();

  const form = useForm<CreateWaAccountFormData>({
    resolver: yupResolver(createWaAccountSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const handleSubmit = (data: CreateWaAccountFormData) => {
    createMutation.mutate(
      {
        ...data,
        appId: data.appId || undefined,
        graphApiVersion: data.graphApiVersion || undefined,
      },
      {
        onSuccess: (response) => {
          notifications.show({
            color: "green",
            title: t("notifications.success"),
            message: t("accounts.created"),
          });
          form.reset(DEFAULT_VALUES);
          onSaved(response.data);
        },
        onError: (error: unknown) => {
          notifications.show({
            color: "red",
            title: t("notifications.error"),
            message: extractErrorMessage(error, t("notifications.saveFailed")),
          });
        },
      },
    );
  };

  return {
    form,
    onSubmit: handleSubmit,
    isLoading: createMutation.isPending,
  };
};
