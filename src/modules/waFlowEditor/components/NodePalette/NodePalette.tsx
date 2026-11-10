import type { WaNodeType } from "@/models";
import { Button, Paper, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { NODE_TYPE_ORDER, NODE_TYPES } from "../../const/nodeTypes.const";

interface NodePaletteProps {
  onAdd: (type: WaNodeType) => void;
}

export const NodePalette = ({ onAdd }: NodePaletteProps) => {
  const { t } = useTranslation("whatsapp");

  return (
    <Paper p="xs" withBorder>
      <Stack gap={4}>
        <Text size="xs" fw={600} c="dimmed" tt="uppercase">
          {t("editor.addNode")}
        </Text>
        {NODE_TYPE_ORDER.map((type) => {
          const { icon: NodeIcon, color } = NODE_TYPES[type];
          return (
            <Button
              key={type}
              variant="light"
              color={color}
              size="xs"
              justify="flex-start"
              leftSection={<NodeIcon size={14} />}
              onClick={() => onAdd(type)}
            >
              {t(`editor.types.${type}`)}
            </Button>
          );
        })}
      </Stack>
    </Paper>
  );
};
