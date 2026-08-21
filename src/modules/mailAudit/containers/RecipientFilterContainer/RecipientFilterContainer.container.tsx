import { EmailFilter } from "@/modules/common/components";
import { useMailAuditFiltersStore } from "@/store";
import { useDebouncedCallback } from "@mantine/hooks";
import { useTranslation } from "react-i18next";

const DEBOUNCE_MS = 300;

export const RecipientFilterContainer = () => {
  const { t } = useTranslation("mailAudit");
  const { recipient, setRecipient } = useMailAuditFiltersStore();
  const debouncedSetRecipient = useDebouncedCallback(setRecipient, DEBOUNCE_MS);

  return (
    <EmailFilter
      value={recipient}
      onChange={debouncedSetRecipient}
      placeholder={t("filters.recipient", "Search by recipient...")}
    />
  );
};
