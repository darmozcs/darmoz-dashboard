import { PageHeader, PlusButton } from "@/modules/common/components";
import { useTranslation } from "react-i18next";

export const UserMasterHeaderContainer = () => {
  const { t } = useTranslation();

  return (
    <PageHeader title={t("common:menu.user")}>
      <PlusButton label={t("users:actions.addUser")} />
    </PageHeader>
  );
};
