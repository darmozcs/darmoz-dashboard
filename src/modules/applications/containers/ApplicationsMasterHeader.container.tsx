import { PageHeader, PlusButton } from "@/modules/common/components";
import { useApplicationsFiltersStore } from "@/store";
import { useTranslation } from "react-i18next";
import { CreateApplicationModal } from "../components/CreateApplicationModal/CreateApplicationModal";

export const ApplicationsMasterHeaderContainer = () => {
  const { t } = useTranslation();
  const { createOpen, setCreateOpen } = useApplicationsFiltersStore();

  return (
    <>
      <PageHeader title={t("common:menu.applications")}>
        <PlusButton
          label={t("applications:actions.addApplication")}
          onClick={() => setCreateOpen(true)}
        />
      </PageHeader>
      <CreateApplicationModal
        opened={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </>
  );
};
