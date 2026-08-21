import { PageHeader, PlusButton } from "@/modules/common/components";
import { useRolePermissionsFiltersStore } from "@/store";
import { useTranslation } from "react-i18next";
import { CreateRolePermissionModal } from "../components/CreateRolePermissionModal/CreateRolePermissionModal";

export const RolePermissionsMasterHeaderContainer = () => {
  const { t } = useTranslation();
  const { createOpen, setCreateOpen } = useRolePermissionsFiltersStore();

  return (
    <>
      <PageHeader title={t("common:menu.permissions")}>
        <PlusButton
          label={t("permissions:actions.addPermission")}
          onClick={() => setCreateOpen(true)}
        />
      </PageHeader>
      <CreateRolePermissionModal
        opened={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </>
  );
};
