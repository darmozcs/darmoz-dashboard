import type { DataTableColumn } from "@/libs/ui/table";
import type { Aplication } from "@/models";
import { ActionIcon } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import type { TFunction } from "i18next";

export const getApplicationsTableColumns = (
  t: TFunction,
  onEdit: (application: Aplication) => void,
): DataTableColumn<Aplication>[] =>
  [
    {
      accessor: "name",
      title: t("master.name", "Name"),
      width: 200,
    },
    {
      accessor: "description",
      title: t("master.description", "Description"),
    },
    {
      accessor: "unverifiedLoginLimit",
      title: t("master.unverifiedLoginLimit", "Unverified login limit"),
      width: 200,
    },
    {
      accessor: "actions",
      title: "",
      width: 60,
      render: (application) => (
        <ActionIcon variant="subtle" onClick={() => onEdit(application)}>
          <IconPencil size={18} />
        </ActionIcon>
      ),
    },
  ] as const;
