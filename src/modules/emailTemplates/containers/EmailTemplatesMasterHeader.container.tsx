import { PageHeader, PlusButton } from "@/modules/common/components";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CreateEmailTemplateModal } from "../components/CreateEmailTemplateModal/CreateEmailTemplateModal";

export const EmailTemplatesMasterHeaderContainer = () => {
  const { t } = useTranslation();
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <>
      <PageHeader title={t("common:menu.templates")}>
        <PlusButton
          label={t("emailTemplates:actions.addTemplate")}
          onClick={() => setCreateOpen(true)}
        />
      </PageHeader>
      <CreateEmailTemplateModal
        opened={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </>
  );
};
