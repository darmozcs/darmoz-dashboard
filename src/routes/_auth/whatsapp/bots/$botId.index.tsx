import { createFileRoute } from "@tanstack/react-router";
import { WaBotDetail } from "@/pages/WaBotDetail.page";

const WaBotDetailRoute = () => {
  const { botId } = Route.useParams();
  return <WaBotDetail botId={botId} />;
};

export const Route = createFileRoute("/_auth/whatsapp/bots/$botId/")({
  component: WaBotDetailRoute,
});
