import { useCreateApplicationMutation } from "@/DAL/applications";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import {
  createApplicationSchema,
  type CreateApplicationFormData,
} from "../../schemas/createApplication.schema";

export const useCreateApplicationForm = (onSaved: () => void) => {
  const createApplicationMutation = useCreateApplicationMutation();

  const form = useForm<CreateApplicationFormData>({
    resolver: yupResolver(createApplicationSchema),
    defaultValues: {
      serviceName: "",
      name: "",
      description: "",
      unverifiedLoginLimit: 0,
    },
  });

  const handleSubmit = (data: CreateApplicationFormData) => {
    createApplicationMutation.mutate(data, {
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
