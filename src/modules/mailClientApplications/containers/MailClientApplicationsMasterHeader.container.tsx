import { PageHeader, PlusButton } from "@/modules/common/components";
import { useMailClientApplicationsFiltersStore } from "@/store";
import { useTranslation } from "react-i18next";
import { CreateMailClientApplicationModal } from "../components/CreateMailClientApplicationModal/CreateMailClientApplicationModal";

export const MailClientApplicationsMasterHeaderContainer = () => {
  const { t } = useTranslation();
  const { createOpen, setCreateOpen } = useMailClientApplicationsFiltersStore();

  return (
    <>
      <PageHeader title={t("common:menu.mailApplications")}>
        <PlusButton
          label={t("mailApplications:actions.addApplication")}
          onClick={() => setCreateOpen(true)}
        />
      </PageHeader>
      <CreateMailClientApplicationModal
        opened={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </>
  );
};
