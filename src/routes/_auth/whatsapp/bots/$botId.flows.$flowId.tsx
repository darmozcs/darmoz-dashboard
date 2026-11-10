import { createFileRoute } from "@tanstack/react-router";
import { WaFlowEditor } from "@/pages/WaFlowEditor.page";

const WaFlowEditorRoute = () => {
  const { botId, flowId } = Route.useParams();
  return <WaFlowEditor botId={botId} flowId={flowId} />;
};

export const Route = createFileRoute("/_auth/whatsapp/bots/$botId/flows/$flowId")({
  component: WaFlowEditorRoute,
});
