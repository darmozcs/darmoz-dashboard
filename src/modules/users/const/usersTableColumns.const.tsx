import type { DataTableColumn } from "@/libs/ui/table";
import type { User } from "@/models";
import type { TFunction } from "i18next";
import { EmailFilterContainer } from "../containers";

export const getUsersTableColumns = (
  t: TFunction,
  search: string,
): DataTableColumn<User>[] =>
  [
    {
      accessor: "email",
      title: t("master.email", "Email"),
      width: 300,
      filter: <EmailFilterContainer />,
      filtering: search !== "",
    },
    {
      accessor: "enabled",
      title: t("master.status", "Status"),
      width: 100,
    },
    {
      accessor: "emailVerified",
      title: t("master.emailVerified", "Email verified"),
      width: 140,
    },
    {
      accessor: "applicationName",
      title: t("master.application", "Application"),
      width: 200,
    },
    {
      accessor: "roles",
      title: t("master.roles", "Roles"),
      width: 150,
    },
    {
      accessor: "createdAt",
      title: t("master.createdAt", "Created at"),
      width: 180,
    },
  ] as const;
