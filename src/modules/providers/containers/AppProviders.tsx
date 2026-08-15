import { QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { I18nextProvider } from "react-i18next";
import { i18n } from "@/libs/i18n";
import { queryClient } from "@/libs/query";
import { theme } from "@/theme";

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <ModalsProvider
          labels={{
            confirm: "common:modals.labels.confirm",
            cancel: "common:modals.labels.cancel",
          }}
          modalProps={{ centered: true }}
        >
          <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};
