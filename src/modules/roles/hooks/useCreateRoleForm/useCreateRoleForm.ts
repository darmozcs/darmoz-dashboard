import { useCreateRoleMutation } from "@/DAL";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import {
  createRoleSchema,
  type CreateRoleFormData,
} from "../../schemas/createRole.schema";

export const useCreateRoleForm = (onSaved: () => void) => {
  const createRoleMutation = useCreateRoleMutation();

  const form = useForm<CreateRoleFormData>({
    resolver: yupResolver(createRoleSchema),
    defaultValues: { name: "", description: "", applicationId: "" },
  });

  const handleSubmit = (data: CreateRoleFormData) => {
    createRoleMutation.mutate(data, {
      onSuccess: () => {
        notifications.show({
          color: "green",
          title: "Success",
          message: "Role created",
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
    isLoading: createRoleMutation.isPending,
  };
};
