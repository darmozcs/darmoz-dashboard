import { useUpdateWaAccountMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { WaAccount } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  editWaAccountSchema,
  type EditWaAccountFormData,
} from "../../schemas/waAccount.schema";

export const useEditWaAccountForm = (
  account: WaAccount | null,
  onSaved: () => void,
) => {
  const { t } = useTranslation("whatsapp");
  const updateMutation = useUpdateWaAccountMutation();

  const form = useForm<EditWaAccountFormData>({
    resolver: yupResolver(editWaAccountSchema),
    values: {
      name: account?.name ?? "",
      appId: account?.appId ?? "",
      appSecret: "",
      accessToken: "",
      wabaId: account?.wabaId ?? "",
      graphApiVersion: account?.graphApiVersion ?? "",
      active: account?.active ?? true,
    },
  });

  const handleSubmit = (data: EditWaAccountFormData) => {
    if (!account) return;

    updateMutation.mutate(
      {
        id: account.id,
        payload: {
          ...data,
          appSecret: data.appSecret || undefined,
          accessToken: data.accessToken || undefined,
        },
      },
      {
        onSuccess: () => {
          notifications.show({
            color: "green",
            title: t("notifications.success"),
            message: t("accounts.updated"),
          });
          onSaved();
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
    isLoading: updateMutation.isPending,
  };
};
