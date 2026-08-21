import { useRolePermissionsQuery } from "@/DAL";
import { DataTable } from "@/libs/ui/table";
import { useTranslation } from "react-i18next";
import { getRolePermissionsTableColumns } from "../../const/rolePermissionsTableColumns.const";
import { useRolePermissionsMasterTable } from "../../hooks";

export const RolePermissionsMasterTableContainer = () => {
  const { t } = useTranslation("permissions");
  const { data, isLoading } = useRolePermissionsQuery();
  const { handleDelete } = useRolePermissionsMasterTable();
  const rolePermissions = data?.data ?? [];

  const columns = getRolePermissionsTableColumns(t, handleDelete);

  return (
    <DataTable records={rolePermissions} columns={columns} fetching={isLoading} />
  );
};
