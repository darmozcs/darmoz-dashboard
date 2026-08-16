import { Button } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface LogoutButtonProps {
  onClick: () => void;
}

export const LogoutButton = ({ onClick }: LogoutButtonProps) => {
  const { t } = useTranslation("common");

  return (
    <Button
      color="red"
      fullWidth
      leftSection={<IconLogout />}
      onClick={onClick}
    >
      {t("menu.logout")}
    </Button>
  );
};
