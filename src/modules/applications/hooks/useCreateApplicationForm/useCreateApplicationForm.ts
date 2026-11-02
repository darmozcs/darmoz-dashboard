import { useCreateApplicationMutation } from "@/DAL/applications";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import {
  createApplicationSchema,
  type CreateApplicationFormData,
} from "../../schemas/createApplication.schema";
import { minutesToSeconds } from "../../schemas/tokenTtl.schema";

export const useCreateApplicationForm = (onSaved: () => void) => {
  const createApplicationMutation = useCreateApplicationMutation();

  const form = useForm<CreateApplicationFormData>({
    resolver: yupResolver(createApplicationSchema),
    defaultValues: {
      serviceName: "",
      name: "",
      description: "",
      unverifiedLoginLimit: 0,
      accessTokenTtlMinutes: null,
      refreshedAccessTokenTtlMinutes: null,
    },
  });

  const handleSubmit = (data: CreateApplicationFormData) => {
    const {
      accessTokenTtlMinutes,
      refreshedAccessTokenTtlMinutes,
      ...fields
    } = data;
    // Vacío = sin valor propio (usa el de darmoz-auth).
    const payload = {
      ...fields,
      accessTokenTtlSeconds: minutesToSeconds(accessTokenTtlMinutes) ?? undefined,
      refreshedAccessTokenTtlSeconds:
        minutesToSeconds(refreshedAccessTokenTtlMinutes) ?? undefined,
    };

    createApplicationMutation.mutate(payload, {
      onSuccess: () => {
        notifications.show({
          color: "green",
          title: "Success",
          message: "Application created",
        });
        form.reset();
        onSaved();
      },
      onError: (error: unknown) => {
        const message =
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Create failed";
        notifications.show({
          color: "red",
          title: "Error",
          message,
        });
      },
    });
  };

  return {
    form,
    onSubmit: handleSubmit,
    isLoading: createApplicationMutation.isPending,
  };
};
