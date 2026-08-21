import { useUpdateApplicationMutation } from "@/DAL/applications";
import type { Aplication } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import {
  editApplicationLimitSchema,
  type EditApplicationLimitFormData,
} from "../../schemas/editApplicationLimit.schema";

export const useEditApplicationLimitForm = (
  application: Aplication | null,
  onSaved: () => void,
) => {
  const updateApplicationMutation = useUpdateApplicationMutation();

  const form = useForm<EditApplicationLimitFormData>({
    resolver: yupResolver(editApplicationLimitSchema),
    values: { unverifiedLoginLimit: application?.unverifiedLoginLimit ?? 0 },
  });

  const handleSubmit = (data: EditApplicationLimitFormData) => {
    if (!application) return;

    updateApplicationMutation.mutate(
      {
        id: application.id,
        payload: { unverifiedLoginLimit: data.unverifiedLoginLimit },
      },
      {
        onSuccess: () => {
          notifications.show({
            color: "green",
            title: "Success",
            message: "Unverified login limit updated",
          });
          onSaved();
        },
        onError: (error: unknown) => {
          const message =
            (error as { response?: { data?: { message?: string } } })
              ?.response?.data?.message || "Update failed";
          notifications.show({
            color: "red",
            title: "Error",
            message,
          });
        },
      },
    );
  };

  return {
    form,
    onSubmit: handleSubmit,
    isLoading: updateApplicationMutation.isPending,
  };
};
