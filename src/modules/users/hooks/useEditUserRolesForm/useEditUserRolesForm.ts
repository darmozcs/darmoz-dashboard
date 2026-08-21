import { useAssignUserRolesMutation, useRolesQuery } from "@/DAL";
import type { User } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import {
  editUserRolesSchema,
  type EditUserRolesFormData,
} from "../../schemas/editUserRoles.schema";

export const useEditUserRolesForm = (
  user: User | null,
  onSaved: () => void,
) => {
  const assignRolesMutation = useAssignUserRolesMutation();
  const { data } = useRolesQuery();
  const allRoles = data?.data ?? [];

  const initialRoleIds = user
    ? allRoles
        .filter(
          (role) =>
            role.applicationId === user.applicationId &&
            user.roles.includes(role.name),
        )
        .map((role) => role.id)
    : [];

  const form = useForm<EditUserRolesFormData>({
    resolver: yupResolver(editUserRolesSchema),
    values: { roleIds: initialRoleIds },
  });

  const handleSubmit = (formData: EditUserRolesFormData) => {
    if (!user) return;

    const roleNames = allRoles
      .filter((role) => formData.roleIds.includes(role.id))
      .map((role) => role.name);

    assignRolesMutation.mutate(
      { id: user.id, roles: roleNames },
      {
        onSuccess: () => {
          notifications.show({
            color: "green",
            title: "Success",
            message: "Roles updated",
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
    isLoading: assignRolesMutation.isPending,
  };
};
