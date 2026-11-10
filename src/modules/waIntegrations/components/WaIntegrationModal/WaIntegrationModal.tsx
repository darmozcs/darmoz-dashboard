import { ApplicationSelect } from "@/modules/common/components";
import type { WaIntegration } from "@/models";
import {
  Button,
  Modal,
  NumberInput,
  PasswordInput,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useWaIntegrationForm } from "../../hooks/useWaIntegrationForm/useWaIntegrationForm";

interface WaIntegrationModalProps {
  opened: boolean;
  integration: WaIntegration | null;
  onClose: () => void;
}

export const WaIntegrationModal = ({
  opened,
  integration,
  onClose,
}: WaIntegrationModalProps) => {
  const { t } = useTranslation("whatsapp");
  const { form, onSubmit, isLoading } = useWaIntegrationForm(integration, onClose);
  const errors = form.formState.errors;
  const message = (key?: string) => (key ? t(key) : undefined);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="lg"
      title={t(integration ? "integrations.editTitle" : "integrations.createTitle")}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack>
          <Text size="sm" c="dimmed">
            {t("integrations.help")}
          </Text>
          <Controller
            name="applicationId"
            control={form.control}
            render={({ field }) => (
              <ApplicationSelect
                label={t("integrations.application")}
                withAsterisk
                disabled={integration !== null}
                {...field}
                error={message(errors.applicationId?.message)}
              />
            )}
          />
          <Controller
            name="baseUrl"
            control={form.control}
            render={({ field }) => (
              <TextInput
                label={t("integrations.baseUrl")}
                description={t("integrations.baseUrlHint")}
                placeholder="http://vivos-admin-be:8080"
                withAsterisk
                {...field}
                error={message(errors.baseUrl?.message)}
              />
            )}
          />
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Controller
              name="authHeaderName"
              control={form.control}
              render={({ field }) => (
                <TextInput
                  label={t("integrations.headerName")}
                  {...field}
                  error={message(errors.authHeaderName?.message)}
                />
              )}
            />
            <Controller
              name="authHeaderValue"
              control={form.control}
              render={({ field }) => (
                <PasswordInput
                  label={t("integrations.headerValue")}
                  description={
                    integration
                      ? t("integrations.currentValue", {
                          value: integration.authHeaderValueMasked ?? "—",
                        })
                      : undefined
                  }
                  autoComplete="off"
                  {...field}
                />
              )}
            />
          </SimpleGrid>
          <Controller
            name="timeoutMs"
            control={form.control}
            render={({ field }) => (
              <NumberInput
                label={t("integrations.timeout")}
                min={500}
                max={60000}
                step={1000}
                {...field}
                error={message(errors.timeoutMs?.message)}
              />
            )}
          />
          <Button type="submit" loading={isLoading}>
            {t("common.save")}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
