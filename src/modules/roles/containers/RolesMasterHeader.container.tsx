import { PageHeader, PlusButton } from "@/modules/common/components";
import { useRolesFiltersStore } from "@/store";
import { useTranslation } from "react-i18next";
import { CreateRoleModal } from "../components/CreateRoleModal/CreateRoleModal";

export const RolesMasterHeaderContainer = () => {
  const { t } = useTranslation();
  const { createOpen, setCreateOpen } = useRolesFiltersStore();

  return (
    <>
      <PageHeader title={t("common:menu.roles")}>
        <PlusButton
          label={t("roles:actions.addRole")}
          onClick={() => setCreateOpen(true)}
        />
      </PageHeader>
      <CreateRoleModal opened={createOpen} onClose={() => setCreateOpen(false)} />
    </>
  );
};
