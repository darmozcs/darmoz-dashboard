import { SUPPORTED_LANGUAGES } from "@/libs/i18n";
import { useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";

export const useLanguageMenu = () => {
  const { i18n, t } = useTranslation(["common"]);

  const currentLanguageLabel = t(`common:languages.${i18n.language}`);

  const data = useMemo(() => {
    const languages: { value: string; label: string }[] = [];

    for (const lang of SUPPORTED_LANGUAGES) {
      if (lang === i18n.language) continue;
      languages.push({
        value: lang,
        label: t(`common:languages.${lang}`),
      });
    }

    return languages;
  }, [i18n.language, t]);

  const handleChange = useCallback(
    (value: string | null) => {
      if (value === null) return;
      if ((SUPPORTED_LANGUAGES as readonly string[]).includes(value)) {
        void i18n.changeLanguage(value);
      }
    },
    [i18n],
  );

  return {
    data,
    currentLanguageLabel,
    handleChange,
  };
};