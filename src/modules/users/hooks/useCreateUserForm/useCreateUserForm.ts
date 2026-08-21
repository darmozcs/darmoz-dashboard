import { useCreateUserMutation, useRolesQuery } from "@/DAL";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import {
  createUserSchema,
  type CreateUserFormData,
} from "../../schemas/createUser.schema";

export const useCreateUserForm = (onSaved: () => void) => {
  const createUserMutation = useCreateUserMutation();
  const { data } = useRolesQuery();
  const allRoles = data?.data ?? [];

  const form = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserSchema),
    defaultValues: {
      email: "",
      password: "",
      applicationId: "",
      roleIds: [],
    },
  });

  const handleSubmit = (formData: CreateUserFormData) => {
    const roleNames = allRoles
      .filter((role) => formData.roleIds.includes(role.id))
      .map((role) => role.name);

    createUserMutation.mutate(
      {
        email: formData.email,
        password: formData.password,
        applicationId: formData.applicationId,
        roles: roleNames,
      },
      {
        onSuccess: () => {
          notifications.show({
            color: "green",
            title: "Success",
            message: "User created",
          });
          form.reset();
          onSaved();
        },
        onError: (error: unknown) => {
          const message =
            (error as { response?: { data?: { message?: string } } })
              ?.response?.data?.message || "Create failed";
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
    isLoading: createUserMutation.isPending,
  };
};
