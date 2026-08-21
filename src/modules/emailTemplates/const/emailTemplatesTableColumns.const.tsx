import { confirmDelete } from "@/libs/ui/confirm/confirmDelete";
import type { DataTableColumn } from "@/libs/ui/table";
import type { EmailTemplate } from "@/models";
import { ActionIcon, Badge, Group } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import type { TFunction } from "i18next";

interface EmailTemplatesTableActions {
  onEdit: (template: EmailTemplate) => void;
  onDelete: (template: EmailTemplate) => void;
}

export const getEmailTemplatesTableColumns = (
  t: TFunction,
  actions: EmailTemplatesTableActions,
): DataTableColumn<EmailTemplate>[] =>
  [
    {
      accessor: "code",
      title: t("master.code", "Code"),
      width: 160,
    },
    {
      accessor: "name",
      title: t("master.name", "Name"),
      width: 200,
    },
    {
      accessor: "subject",
      title: t("master.subject", "Subject"),
    },
    {
      accessor: "active",
      title: t("master.active", "Active"),
      width: 100,
      render: (template) => (
        <Badge color={template.active ? "green" : "gray"} variant="light">
          {template.active ? t("common:yes", "Yes") : t("common:no", "No")}
        </Badge>
      ),
    },
    {
      accessor: "updatedAt",
      title: t("master.updatedAt", "Updated at"),
      width: 180,
    },
    {
      accessor: "actions",
      title: "",
      width: 90,
      render: (template) => (
        <Group gap="xs" wrap="nowrap">
          <ActionIcon variant="subtle" onClick={() => actions.onEdit(template)}>
            <IconPencil size={18} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() =>
              confirmDelete({
                title: t("deleteTitle", "Delete template"),
                message: t("deleteMessage", {
                  defaultValue: 'Are you sure you want to delete "{{name}}"?',
                  name: template.name,
                }),
                onConfirm: () => actions.onDelete(template),
              })
            }
          >
            <IconTrash size={18} />
          </ActionIcon>
        </Group>
      ),
    },
  ] as const;
