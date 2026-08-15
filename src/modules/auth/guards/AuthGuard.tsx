import { Center, Loader, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const AuthGuard = () => {
  const { t } = useTranslation("common");

  return (
    <Center h="100vh">
      <Stack align="center" gap="md">
        <Loader size="lg" color="primary" />
        <Text c="dimmed">{t("auth.verifying", "Verifying session...")}</Text>
      </Stack>
    </Center>
  );
};
