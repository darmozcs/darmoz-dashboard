import {
  Alert,
  Anchor,
  Badge,
  Button,
  Group,
  List,
  Stack,
  Text,
} from "@mantine/core";
import { IconAlertTriangle, IconCircleCheck } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { META_DOCS_URL } from "../../const/waAccounts.const";
import type { ConnectWaAccountWizard } from "../../hooks/useConnectWaAccountWizard/useConnectWaAccountWizard";
import { CopyField } from "./CopyField";

interface StepProps {
  wizard: ConnectWaAccountWizard;
}

export const ValidateStep = ({ wizard }: StepProps) => {
  const { t } = useTranslation("whatsapp");
  const { validation } = wizard;

  return (
    <Stack>
      <Text size="sm">{t("connect.validate.help")}</Text>
      <Group>
        <Button onClick={wizard.validate} loading={wizard.isValidating}>
          {t("connect.validate.action")}
        </Button>
        <Anchor href={META_DOCS_URL} target="_blank" size="sm">
          {t("connect.docs")}
        </Anchor>
      </Group>
      {validation?.valid && (
        <Alert color="green" icon={<IconCircleCheck />}>
          {t("connect.validate.ok", { name: validation.wabaName ?? "" })}
        </Alert>
      )}
      {validation && !validation.valid && (
        <Alert color="red" icon={<IconAlertTriangle />}>
          {validation.error}
        </Alert>
      )}
    </Stack>
  );
};

export const WebhookStep = ({ wizard }: StepProps) => {
  const { t } = useTranslation("whatsapp");
  const info = wizard.webhookInfo;

  return (
    <Stack>
      <List size="sm" type="ordered">
        <List.Item>{t("connect.webhook.step1")}</List.Item>
        <List.Item>{t("connect.webhook.step2")}</List.Item>
        <List.Item>
          {t("connect.webhook.step3", { fields: info?.subscribeFields ?? "" })}
        </List.Item>
      </List>
      <CopyField
        label={t("connect.webhook.callbackUrl")}
        value={info?.callbackUrl ?? ""}
      />
      <CopyField
        label={t("connect.webhook.verifyToken")}
        value={info?.verifyToken ?? ""}
      />
      <Group>
        <Button
          variant="subtle"
          size="xs"
          onClick={wizard.regenerateToken}
          loading={wizard.isRegenerating}
        >
          {t("connect.webhook.regenerate")}
        </Button>
      </Group>
    </Stack>
  );
};

export const NumbersStep = ({ wizard }: StepProps) => {
  const { t } = useTranslation("whatsapp");

  return (
    <Stack>
      <Text size="sm">{t("connect.numbers.help")}</Text>
      <Group>
        <Button onClick={wizard.syncNumbers} loading={wizard.isSyncing}>
          {t("connect.numbers.action")}
        </Button>
      </Group>
      {wizard.phoneNumbers.length === 0 ? (
        <Text size="sm" c="dimmed">
          {t("connect.numbers.empty")}
        </Text>
      ) : (
        <Stack gap={4}>
          {wizard.phoneNumbers.map((phone) => (
            <Group key={phone.id} gap="xs">
              <Badge variant="light">{phone.displayNumber}</Badge>
              <Text size="sm">{phone.verifiedName}</Text>
            </Group>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export const SubscribeStep = ({ wizard }: StepProps) => {
  const { t } = useTranslation("whatsapp");

  return (
    <Stack>
      <Text size="sm">{t("connect.subscribe.help")}</Text>
      <Group>
        <Button onClick={wizard.subscribe} loading={wizard.isSubscribing}>
          {t("connect.subscribe.action")}
        </Button>
      </Group>
      {wizard.subscribed && (
        <Alert color="green" icon={<IconCircleCheck />}>
          {t("connect.subscribe.ok")}
        </Alert>
      )}
    </Stack>
  );
};
