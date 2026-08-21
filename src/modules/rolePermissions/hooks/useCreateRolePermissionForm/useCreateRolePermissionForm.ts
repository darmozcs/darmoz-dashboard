import { useCreateRolePermissionMutation } from "@/DAL";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import {
  createRolePermissionSchema,
  type CreateRolePermissionFormData,
} from "../../schemas/createRolePermission.schema";

export const useCreateRolePermissionForm = (onSaved: () => void) => {
  const createRolePermissionMutation = useCreateRolePermissionMutation();

  const form = useForm<CreateRolePermissionFormData>({
    resolver: yupResolver(createRolePermissionSchema),
    defaultValues: {
      roleId: "",
      service: "",
      httpMethod: "GET",
      endpointPattern: "",
    },
  });

  const handleSubmit = (data: CreateRolePermissionFormData) => {
    createRolePermissionMutation.mutate(data, {
      onSuccess: () => {
        notifications.show({
          color: "green",
          title: "Success",
          message: "Permission created",
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
    isLoading: createRolePermissionMutation.isPending,
  };
};
