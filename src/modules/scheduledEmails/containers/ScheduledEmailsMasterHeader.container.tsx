import { PageHeader, PlusButton } from "@/modules/common/components";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CreateScheduledEmailModal } from "../components/CreateScheduledEmailModal/CreateScheduledEmailModal";

export const ScheduledEmailsMasterHeaderContainer = () => {
  const { t } = useTranslation();
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <>
      <PageHeader title={t("common:menu.scheduledEmails")}>
        <PlusButton
          label={t("scheduledEmails:actions.addScheduledEmail")}
          onClick={() => setCreateOpen(true)}
        />
      </PageHeader>
      <CreateScheduledEmailModal
        opened={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </>
  );
};
