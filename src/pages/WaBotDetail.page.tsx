import { useWaBotQuery } from "@/DAL";
import { PageHeader } from "@/modules/common/components";
import { BOT_DETAIL_TABS } from "@/modules/waBots/const/waBots.const";
import {
  WaBotFlowsContainer,
  WaBotSettingsContainer,
} from "@/modules/waBots/containers";
import { Anchor, Breadcrumbs, Stack, Tabs } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

interface WaBotDetailProps {
  botId: string;
}

export const WaBotDetail = ({ botId }: WaBotDetailProps) => {
  const { t } = useTranslation("whatsapp");
  const bot = useWaBotQuery(botId);
  const name = bot.data?.data.name ?? "…";

  return (
    <Stack>
      <Breadcrumbs>
        <Anchor component={Link} to="/whatsapp/bots" size="sm">
          {t("common:menu.waBots")}
        </Anchor>
        <Anchor size="sm" c="dimmed">
          {name}
        </Anchor>
      </Breadcrumbs>
      <PageHeader title={name} />
      <Tabs defaultValue={BOT_DETAIL_TABS.FLOWS} keepMounted={false}>
        <Tabs.List>
          <Tabs.Tab value={BOT_DETAIL_TABS.FLOWS}>{t("bots.tabs.flows")}</Tabs.Tab>
          <Tabs.Tab value={BOT_DETAIL_TABS.SETTINGS}>
            {t("bots.tabs.settings")}
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value={BOT_DETAIL_TABS.FLOWS} pt="md">
          <WaBotFlowsContainer botId={botId} />
        </Tabs.Panel>
        <Tabs.Panel value={BOT_DETAIL_TABS.SETTINGS} pt="md">
          <WaBotSettingsContainer botId={botId} />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};
