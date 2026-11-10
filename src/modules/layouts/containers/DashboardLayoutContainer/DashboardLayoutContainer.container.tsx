import type { SidebarMenuItem } from "@/modules/common/components";
import {
  IconAppWindow,
  IconBrandMeta,
  IconBrandWhatsapp,
  IconCalendarTime,
  IconClipboardCheck,
  IconListDetails,
  IconLock,
  IconMail,
  IconMessages,
  IconPhone,
  IconPlugConnected,
  IconRobot,
  IconShieldLock,
  IconTemplate,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import { DashboardLayout } from "../../components/DashboardLayout/DashboardLayout";

const MENU_ITEMS: SidebarMenuItem[] = [
  {
    label: "menu.auth",
    icon: IconShieldLock,
    children: [
      {
        label: "menu.user",
        to: "/user",
        icon: IconUser,
      },
      {
        label: "menu.roles",
        to: "/roles",
        icon: IconUsers,
      },
      {
        label: "menu.permissions",
        to: "/permissions",
        icon: IconLock,
      },
      {
        label: "menu.applications",
        to: "/applications",
        icon: IconAppWindow,
      },
      {
        label: "menu.audit",
        to: "/audit",
        icon: IconClipboardCheck,
      },
    ],
  },
  {
    label: "menu.mail",
    icon: IconMail,
    children: [
      {
        label: "menu.mailAudit",
        to: "/mail/audit",
        icon: IconClipboardCheck,
      },
      {
        label: "menu.scheduledEmails",
        to: "/mail/scheduled-emails",
        icon: IconCalendarTime,
      },
      {
        label: "menu.templates",
        to: "/mail/templates",
        icon: IconTemplate,
      },
      {
        label: "menu.mailApplications",
        to: "/mail/applications",
        icon: IconAppWindow,
      },
    ],
  },
  {
    label: "menu.whatsapp",
    icon: IconBrandWhatsapp,
    children: [
      {
        label: "menu.waAccounts",
        to: "/whatsapp/accounts",
        icon: IconBrandMeta,
      },
      {
        label: "menu.waNumbers",
        to: "/whatsapp/numbers",
        icon: IconPhone,
      },
      {
        label: "menu.waIntegrations",
        to: "/whatsapp/integrations",
        icon: IconPlugConnected,
      },
      {
        label: "menu.waBots",
        to: "/whatsapp/bots",
        icon: IconRobot,
      },
      {
        label: "menu.waConversations",
        to: "/whatsapp/conversations",
        icon: IconMessages,
      },
      {
        label: "menu.waMessageLogs",
        to: "/whatsapp/message-logs",
        icon: IconListDetails,
      },
    ],
  },
];

export const DashboardLayoutContainer = () => {
  return <DashboardLayout menuItems={MENU_ITEMS} />;
};
