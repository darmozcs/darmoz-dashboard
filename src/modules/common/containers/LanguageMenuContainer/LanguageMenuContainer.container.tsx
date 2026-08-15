import { LanguageMenu } from "@/modules/common/components";
import { useLanguageMenu } from "@/modules/common/hooks";

export const LanguageMenuContainer = () => {
  const { data, currentLanguageLabel, handleChange } = useLanguageMenu();

  return (
    <LanguageMenu
      data={data}
      currentLanguageLabel={currentLanguageLabel}
      onChange={handleChange}
    />
  );
};
