import { useDeleteUserMutation, useUpdateUserMutation, useUsersQuery } from "@/DAL";
import { DataTable } from "@/libs/ui/table";
import type { User } from "@/models";
import { useUsersMasterFiltersStore } from "@/store";
import { notifications } from "@mantine/notifications";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { EditUserRolesModal } from "../../components/EditUserRolesModal/EditUserRolesModal";
import { getUsersTableColumns } from "../../const/usersTableColumns.const";

export const UsersMasterTableContainer = () => {
  const { t } = useTranslation("users");
  const { search, applicationId, page, limit, setPage, setLimit } =
    useUsersMasterFiltersStore();
  const [selectedUserForRoles, setSelectedUserForRoles] =
    useState<User | null>(null);

  const { data, isLoading } = useUsersQuery();
  const updateUserMutation = useUpdateUserMutation();
  const deleteUserMutation = useDeleteUserMutation();

  const allUsers = data?.data ?? [];

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return allUsers.filter((user) => {
      const matchesSearch =
        !normalizedSearch || user.email.toLowerCase().includes(normalizedSearch);
      const matchesApplication =
        !applicationId || user.applicationId === applicationId;
      return matchesSearch && matchesApplication;
    });
  }, [allUsers, search, applicationId]);

  const pagedUsers = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredUsers.slice(start, start + limit);
  }, [filteredUsers, page, limit]);

  const handleToggleEnabled = (user: User) => {
    updateUserMutation.mutate(
      { id: user.id, payload: { enabled: !user.enabled } },
      {
        onError: (error: unknown) => {
          const message =
            (error as { response?: { data?: { message?: string } } })
              ?.response?.data?.message || "Update failed";
          notifications.show({ color: "red", title: "Error", message });
        },
      },
    );
  };

  const handleDelete = (user: User) => {
    deleteUserMutation.mutate(user.id, {
      onSuccess: () => {
        notifications.show({
          color: "green",
          title: "Success",
          message: t("deleteSuccess", "User deleted"),
        });
      },
      onError: (error: unknown) => {
        const message =
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Delete failed";
        notifications.show({ color: "red", title: "Error", message });
      },
    });
  };

  const columns = getUsersTableColumns(
    t,
    { search, applicationId },
    {
      onToggleEnabled: handleToggleEnabled,
      onEditRoles: setSelectedUserForRoles,
      onDelete: handleDelete,
    },
  );

  return (
    <>
      <DataTable
        records={pagedUsers}
        columns={columns}
        totalRecords={filteredUsers.length}
        page={page}
        onPageChange={setPage}
        recordsPerPage={limit}
        onRecordsPerPageChange={setLimit}
        fetching={isLoading}
      />
      <EditUserRolesModal
        user={selectedUserForRoles}
        onClose={() => setSelectedUserForRoles(null)}
      />
    </>
  );
};
