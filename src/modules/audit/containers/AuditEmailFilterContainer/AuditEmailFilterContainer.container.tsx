import { EmailFilter } from "@/modules/common/components";
import { useAuditFiltersStore } from "@/store";
import { useDebouncedCallback } from "@mantine/hooks";
import { useTranslation } from "react-i18next";

const DEBOUNCE_MS = 300;

export const AuditEmailFilterContainer = () => {
  const { t } = useTranslation("audit");
  const { email, setEmail } = useAuditFiltersStore();
  const debouncedSetEmail = useDebouncedCallback(setEmail, DEBOUNCE_MS);

  return (
    <EmailFilter
      value={email}
      onChange={debouncedSetEmail}
      placeholder={t("filters.email", "Search by email...")}
    />
  );
};
