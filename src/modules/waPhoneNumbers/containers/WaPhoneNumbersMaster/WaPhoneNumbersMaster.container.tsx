import { DataTable } from "@/libs/ui/table";
import { PageHeader } from "@/modules/common/components";
import { Box, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { TestMessageModal } from "../../components/TestMessageModal/TestMessageModal";
import { getWaPhoneNumbersTableColumns } from "../../const/waPhoneNumbersTableColumns.const";
import { useWaPhoneNumbersMaster } from "../../hooks/useWaPhoneNumbersMaster/useWaPhoneNumbersMaster";

export const WaPhoneNumbersMasterContainer = () => {
  const { t } = useTranslation("whatsapp");
  const master = useWaPhoneNumbersMaster();

  const columns = getWaPhoneNumbersTableColumns(t, {
    botOptions: master.botOptions,
    onAssignBot: master.assignBot,
    onToggleActive: master.toggleActive,
    onTest: master.setTesting,
    onDelete: master.remove,
  });

  return (
    <Stack h="100%">
      <PageHeader title={t("common:menu.waNumbers")} />
      <Text size="sm" c="dimmed" px="xs">
        {t("numbers.pageHelp")}
      </Text>
      <Box flex={1} mih={0}>
        <DataTable
          records={master.phoneNumbers}
          columns={columns}
          fetching={master.isLoading}
        />
      </Box>
      <TestMessageModal
        phone={master.testing}
        onClose={() => master.setTesting(null)}
      />
    </Stack>
  );
};
