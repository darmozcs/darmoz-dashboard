import { Button, Select, Stack, Text, TextInput, Textarea } from "@mantine/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TEST_MESSAGE_MAX_LENGTH } from "../../const/waAccounts.const";
import type { ConnectWaAccountWizard } from "../../hooks/useConnectWaAccountWizard/useConnectWaAccountWizard";

interface TestMessageStepProps {
  wizard: ConnectWaAccountWizard;
}

export const TestMessageStep = ({ wizard }: TestMessageStepProps) => {
  const { t } = useTranslation("whatsapp");
  const [phoneNumberId, setPhoneNumberId] = useState<string | null>(null);
  const [to, setTo] = useState("");
  const [text, setText] = useState(t("connect.test.defaultText"));

  return (
    <Stack>
      <Text size="sm">{t("connect.test.help")}</Text>
      <Select
        label={t("connect.test.from")}
        data={wizard.phoneNumbers.map((phone) => ({
          value: phone.id,
          label: `${phone.displayNumber ?? phone.phoneNumberId} · ${phone.verifiedName ?? ""}`,
        }))}
        value={phoneNumberId}
        onChange={setPhoneNumberId}
      />
      <TextInput
        label={t("connect.test.to")}
        description={t("connect.test.toHint")}
        value={to}
        onChange={(event) => setTo(event.currentTarget.value.replace(/[^0-9]/g, ""))}
      />
      <Textarea
        label={t("connect.test.text")}
        value={text}
        maxLength={TEST_MESSAGE_MAX_LENGTH}
        autosize
        minRows={2}
        onChange={(event) => setText(event.currentTarget.value)}
      />
      <Button
        onClick={() => phoneNumberId && wizard.sendTest(phoneNumberId, to, text)}
        disabled={!phoneNumberId || to.length < 8 || !text.trim()}
        loading={wizard.isSendingTest}
      >
        {t("connect.test.action")}
      </Button>
    </Stack>
  );
};
