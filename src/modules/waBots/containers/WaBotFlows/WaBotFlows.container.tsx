import { DataTable } from "@/libs/ui/table";
import { Button, Group, Stack, Text, TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { getWaFlowsTableColumns } from "../../const/waFlowsTableColumns.const";
import { useWaBotFlows } from "../../hooks/useWaBotFlows/useWaBotFlows";

interface WaBotFlowsContainerProps {
  botId: string;
}

export const WaBotFlowsContainer = ({ botId }: WaBotFlowsContainerProps) => {
  const { t } = useTranslation("whatsapp");
  const flows = useWaBotFlows(botId);

  const columns = getWaFlowsTableColumns(t, {
    entryFlowId: flows.entryFlowId,
    onOpen: flows.openEditor,
    onDelete: flows.remove,
  });

  return (
    <Stack>
      <Text size="sm" c="dimmed">
        {t("flows.help")}
      </Text>
      <Group align="flex-end">
        <TextInput
          label={t("flows.newFlow")}
          placeholder={t("flows.newFlowPlaceholder")}
          value={flows.newFlowName}
          onChange={(event) => flows.setNewFlowName(event.currentTarget.value)}
          w={{ base: "100%", sm: 320 }}
        />
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={flows.create}
          disabled={!flows.newFlowName.trim()}
          loading={flows.isCreating}
        >
          {t("flows.create")}
        </Button>
      </Group>
      <DataTable
        records={flows.flows}
        columns={columns}
        fetching={flows.isLoading}
        onRowClick={({ record }) => flows.openEditor(record)}
      />
    </Stack>
  );
};
