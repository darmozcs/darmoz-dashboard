import type { WaIntegration } from "@/models";
import {
  Badge,
  Button,
  Code,
  Group,
  Modal,
  ScrollArea,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TEST_METHODS } from "../../const/waIntegrations.const";
import { useWaIntegrationTest } from "../../hooks/useWaIntegrationTest/useWaIntegrationTest";

interface WaIntegrationTestModalProps {
  integration: WaIntegration | null;
  onClose: () => void;
}

export const WaIntegrationTestModal = ({
  integration,
  onClose,
}: WaIntegrationTestModalProps) => {
  const { t } = useTranslation("whatsapp");
  const test = useWaIntegrationTest(integration);

  const close = () => {
    test.reset();
    onClose();
  };

  return (
    <Modal
      opened={integration !== null}
      onClose={close}
      size="lg"
      title={t("integrations.testTitle", { name: integration?.applicationName ?? "" })}
    >
      <form onSubmit={test.form.handleSubmit(test.onSubmit)}>
        <Stack>
          <Text size="sm" c="dimmed">
            {t("integrations.testHelp", { baseUrl: integration?.baseUrl ?? "" })}
          </Text>
          <Group align="flex-end" wrap="nowrap">
            <Controller
              name="method"
              control={test.form.control}
              render={({ field }) => (
                <Select data={[...TEST_METHODS]} w={100} {...field} />
              )}
            />
            <Controller
              name="path"
              control={test.form.control}
              render={({ field }) => (
                <TextInput label={t("integrations.path")} flex={1} {...field} />
              )}
            />
            <Button type="submit" loading={test.isLoading}>
              {t("integrations.test")}
            </Button>
          </Group>
          {test.result && (
            <Stack gap="xs">
              <Badge color={test.isSuccess ? "green" : "red"}>
                HTTP {test.result.status}
              </Badge>
              <ScrollArea.Autosize mah={300}>
                <Code block>{test.result.body || t("integrations.emptyBody")}</Code>
              </ScrollArea.Autosize>
            </Stack>
          )}
        </Stack>
      </form>
    </Modal>
  );
};
