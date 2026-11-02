import { useUpdateApplicationMutation } from "@/DAL/applications";
import type { Aplication } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import {
  editApplicationSchema,
  type EditApplicationFormData,
} from "../../schemas/editApplication.schema";
import {
  minutesToSeconds,
  secondsToMinutes,
} from "../../schemas/tokenTtl.schema";

export const useEditApplicationForm = (
  application: Aplication | null,
  onSaved: () => void,
) => {
  const updateApplicationMutation = useUpdateApplicationMutation();

  const form = useForm<EditApplicationFormData>({
    resolver: yupResolver(editApplicationSchema),
    values: {
      serviceName: application?.serviceName ?? "",
      name: application?.name ?? "",
      description: application?.description ?? "",
      unverifiedLoginLimit: application?.unverifiedLoginLimit ?? 0,
      accessTokenTtlMinutes: secondsToMinutes(application?.accessTokenTtlSeconds),
      refreshedAccessTokenTtlMinutes: secondsToMinutes(
        application?.refreshedAccessTokenTtlSeconds,
      ),
    },
  });

  const handleSubmit = (data: EditApplicationFormData) => {
    if (!application) return;

    const {
      accessTokenTtlMinutes,
      refreshedAccessTokenTtlMinutes,
      ...fields
    } = data;
    // Vacío se manda como 0: el backend vuelve al valor por defecto.
    const payload = {
      ...fields,
      accessTokenTtlSeconds: minutesToSeconds(accessTokenTtlMinutes) ?? 0,
      refreshedAccessTokenTtlSeconds:
        minutesToSeconds(refreshedAccessTokenTtlMinutes) ?? 0,
    };

    updateApplicationMutation.mutate(
      { id: application.id, payload },
      {
        onSuccess: () => {
          notifications.show({
            color: "green",
            title: "Success",
            message: "Application updated",
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
