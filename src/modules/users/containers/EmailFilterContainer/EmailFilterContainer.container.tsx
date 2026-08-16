import { EmailFilter } from "@/modules/common/components";
import { useUsersMasterFiltersStore } from "@/store";
import { useDebouncedCallback } from "@mantine/hooks";
import { useTranslation } from "react-i18next";

const DEBOUNCE_MS = 300;

export const EmailFilterContainer = () => {
  const { t } = useTranslation("users");
  const { search, setSearch } = useUsersMasterFiltersStore();
  const debouncedSetSearch = useDebouncedCallback(setSearch, DEBOUNCE_MS);

  return (
    <EmailFilter
      value={search}
      onChange={debouncedSetSearch}
      placeholder={t("master.searchEmail", "Search by email...")}
    />
  );
};
