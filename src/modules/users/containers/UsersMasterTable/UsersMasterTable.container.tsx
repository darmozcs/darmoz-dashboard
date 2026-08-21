import { useUsersQuery } from "@/DAL";
import { DataTable } from "@/libs/ui/table";
import { useUsersMasterFiltersStore } from "@/store";
import { useTranslation } from "react-i18next";
import { EditUserRolesModal } from "../../components/EditUserRolesModal/EditUserRolesModal";
import { getUsersTableColumns } from "../../const/usersTableColumns.const";
import { useUsersMasterTable } from "../../hooks";

export const UsersMasterTableContainer = () => {
  const { t } = useTranslation("users");
  const {
    search,
    applicationId,
    page,
    limit,
    setPage,
    setLimit,
    selectedUserForRoles,
    setSelectedUserForRoles,
  } = useUsersMasterFiltersStore();

  const { data, isLoading } = useUsersQuery({
    search: search || undefined,
    applicationId: applicationId ?? undefined,
    page: page - 1,
    size: limit,
  });

  const { handleToggleEnabled, handleDelete } = useUsersMasterTable();

  const users = data?.data?.content ?? [];
  const totalElements = data?.data?.totalElements ?? 0;

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
        records={users}
        columns={columns}
        totalRecords={totalElements}
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
