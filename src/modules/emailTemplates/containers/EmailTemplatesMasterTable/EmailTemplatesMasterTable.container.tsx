import { useEmailTemplatesQuery } from "@/DAL";
import { DataTable } from "@/libs/ui/table";
import { useEmailTemplatesFiltersStore } from "@/store";
import { useTranslation } from "react-i18next";
import { EditEmailTemplateModal } from "../../components/EditEmailTemplateModal/EditEmailTemplateModal";
import { getEmailTemplatesTableColumns } from "../../const/emailTemplatesTableColumns.const";
import { useEmailTemplatesMasterTable } from "../../hooks";

export const EmailTemplatesMasterTableContainer = () => {
  const { t } = useTranslation("emailTemplates");
  const { selectedTemplate, setSelectedTemplate } =
    useEmailTemplatesFiltersStore();

  const { data, isLoading } = useEmailTemplatesQuery();
  const { handleDelete } = useEmailTemplatesMasterTable();
  const templates = data?.data ?? [];

  const columns = getEmailTemplatesTableColumns(t, {
    onEdit: setSelectedTemplate,
    onDelete: handleDelete,
  });

  return (
    <>
      <DataTable records={templates} columns={columns} fetching={isLoading} />
      <EditEmailTemplateModal
        template={selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
      />
    </>
  );
};
