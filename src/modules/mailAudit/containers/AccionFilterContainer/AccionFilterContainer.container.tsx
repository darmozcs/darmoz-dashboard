import { EmailFilter } from "@/modules/common/components";
import { useMailAuditFiltersStore } from "@/store";
import { useDebouncedCallback } from "@mantine/hooks";
import { useTranslation } from "react-i18next";

const DEBOUNCE_MS = 300;

export const AccionFilterContainer = () => {
  const { t } = useTranslation("mailAudit");
  const { accion, setAccion } = useMailAuditFiltersStore();
  const debouncedSetAccion = useDebouncedCallback(setAccion, DEBOUNCE_MS);

  return (
    <EmailFilter
      value={accion}
      onChange={debouncedSetAccion}
      placeholder={t("filters.accion", "Action")}
    />
  );
};
