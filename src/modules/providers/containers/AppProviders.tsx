import { QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import type { PropsWithChildren } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import { i18n } from "@/libs/i18n";
import { queryClient } from "@/libs/query";
import { theme } from "@/theme";

interface AppProvidersProps {
  children: React.ReactNode;
}

const ModalsProviderWithLabels = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation("common");

  return (
    <ModalsProvider
      labels={{
        confirm: t("modals.labels.confirm", "Confirm"),
        cancel: t("modals.labels.cancel", "Cancel"),
      }}
      modalProps={{ centered: true }}
    >
      {children}
    </ModalsProvider>
  );
};

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <ModalsProviderWithLabels>
            <Notifications position="top-right" />
            {children}
          </ModalsProviderWithLabels>
        </I18nextProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};
