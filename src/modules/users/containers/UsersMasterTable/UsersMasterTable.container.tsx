import { useUsersQuery } from "@/DAL";
import { DataTable } from "@/libs/ui/table";
import { useUsersMasterFiltersStore } from "@/store";
import { useTranslation } from "react-i18next";
import { getUsersTableColumns } from "../../const/usersTableColumns.const";

export const UsersMasterTableContainer = () => {
  const { t } = useTranslation("users");
  const { search, page, limit, setPage, setLimit, getQueryParams } =
    useUsersMasterFiltersStore();

  const columns = getUsersTableColumns(t, search);

  const { data, isLoading } = useUsersQuery(getQueryParams());

  const users = data?.data?.content ?? [];
  const totalElements = data?.data?.totalElements ?? 0;

  return (
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
  );
};
