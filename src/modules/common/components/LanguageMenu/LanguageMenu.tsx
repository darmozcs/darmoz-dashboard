import { Button, Menu } from "@mantine/core";
import { IconLanguage } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface LanguageMenuProps {
  data: { value: string; label: string }[];
  currentLanguageLabel: string;
  onChange: (value: string) => void;
}

export const LanguageMenu = ({
  data,
  currentLanguageLabel,
  onChange,
}: LanguageMenuProps) => {
  const { t } = useTranslation(["common"]);

  return (
    <Menu position="bottom-end" withinPortal shadow="sm">
      <Menu.Target>
        <Button
          variant="transparent"
          c={{ base: "white", md: "primary" }}
          aria-label={t("common:languages.select")}
          leftSection={<IconLanguage size={18} />}
        >
          <span className="hidden sm:inline">{currentLanguageLabel}</span>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {data.map(({ value, label }) => (
          <Menu.Item key={value} onClick={() => onChange(value)}>
            {label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
