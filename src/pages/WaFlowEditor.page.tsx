import { useWaBotQuery, useWaFlowQuery } from "@/DAL";
import { FlowEditorContainer } from "@/modules/waFlowEditor/containers";
import { Anchor, Breadcrumbs, Stack, Title } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

interface WaFlowEditorProps {
  botId: string;
  flowId: string;
}

export const WaFlowEditor = ({ botId, flowId }: WaFlowEditorProps) => {
  const { t } = useTranslation("whatsapp");
  const bot = useWaBotQuery(botId);
  const flow = useWaFlowQuery(botId, flowId);

  return (
    <Stack gap="xs">
      <Breadcrumbs>
        <Anchor component={Link} to="/whatsapp/bots" size="sm">
          {t("common:menu.waBots")}
        </Anchor>
        <Anchor size="sm" renderRoot={(props) => <Link {...props} to="/whatsapp/bots/$botId" params={{ botId }} />}>
          {bot.data?.data.name ?? "…"}
        </Anchor>
        <Anchor size="sm" c="dimmed">
          {flow.data?.data.name ?? "…"}
        </Anchor>
      </Breadcrumbs>
      <Title order={3}>{flow.data?.data.name ?? t("editor.title")}</Title>
      <FlowEditorContainer botId={botId} flowId={flowId} />
    </Stack>
  );
};
