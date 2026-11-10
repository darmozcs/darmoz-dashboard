import type { WaAccount } from "@/models";
import { Button, Group, Modal, Stepper } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useConnectWaAccountWizard } from "../../hooks/useConnectWaAccountWizard/useConnectWaAccountWizard";
import {
  NumbersStep,
  SubscribeStep,
  ValidateStep,
  WebhookStep,
} from "./ConnectSteps";
import { TestMessageStep } from "./TestMessageStep";

interface ConnectWaAccountWizardProps {
  account: WaAccount | null;
  onClose: () => void;
}

const STEP_CONTENT = {
  validate: ValidateStep,
  webhook: WebhookStep,
  numbers: NumbersStep,
  subscribe: SubscribeStep,
  test: TestMessageStep,
} as const;

export const ConnectWaAccountWizard = ({
  account,
  onClose,
}: ConnectWaAccountWizardProps) => {
  const { t } = useTranslation("whatsapp");
  const wizard = useConnectWaAccountWizard(account);
  const isLast = wizard.active >= wizard.steps.length - 1;

  const close = () => {
    wizard.reset();
    onClose();
  };

  return (
    <Modal
      opened={account !== null}
      onClose={close}
      title={t("connect.title", { name: account?.name ?? "" })}
      size="xl"
    >
      <Stepper active={wizard.active} onStepClick={wizard.goTo} size="sm">
        {wizard.steps.map((step) => {
          const Content = STEP_CONTENT[step];
          return (
            <Stepper.Step key={step} label={t(`connect.steps.${step}`)}>
              <Content wizard={wizard} />
            </Stepper.Step>
          );
        })}
      </Stepper>
      <Group justify="space-between" mt="xl">
        <Button variant="default" onClick={wizard.back} disabled={wizard.active === 0}>
          {t("common.back")}
        </Button>
        <Button onClick={isLast ? close : wizard.next}>
          {isLast ? t("common.finish") : t("common.next")}
        </Button>
      </Group>
    </Modal>
  );
};
