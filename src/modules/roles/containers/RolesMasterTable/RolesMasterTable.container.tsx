import { useRolesQuery } from "@/DAL";
import { DataTable } from "@/libs/ui/table";
import { useTranslation } from "react-i18next";
import { getRolesTableColumns } from "../../const/rolesTableColumns.const";
import { useRolesMasterTable } from "../../hooks";

export const RolesMasterTableContainer = () => {
  const { t } = useTranslation("roles");
  const { data, isLoading } = useRolesQuery();
  const { handleDelete } = useRolesMasterTable();
  const roles = data?.data ?? [];

  const columns = getRolesTableColumns(t, handleDelete);

  return <DataTable records={roles} columns={columns} fetching={isLoading} />;
};
