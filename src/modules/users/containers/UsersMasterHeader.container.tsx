import { PageHeader, PlusButton } from "@/modules/common/components";
import { useUsersMasterFiltersStore } from "@/store";
import { useTranslation } from "react-i18next";
import { CreateUserModal } from "../components/CreateUserModal/CreateUserModal";

export const UserMasterHeaderContainer = () => {
  const { t } = useTranslation();
  const { createOpen, setCreateOpen } = useUsersMasterFiltersStore();

  return (
    <>
      <PageHeader title={t("common:menu.user")}>
        <PlusButton
          label={t("users:actions.addUser")}
          onClick={() => setCreateOpen(true)}
        />
      </PageHeader>
      <CreateUserModal opened={createOpen} onClose={() => setCreateOpen(false)} />
    </>
  );
};
