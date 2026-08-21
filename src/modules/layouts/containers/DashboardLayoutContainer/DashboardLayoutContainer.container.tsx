import type { SidebarMenuItem } from "@/modules/common/components";
import {
  IconAppWindow,
  IconCalendarTime,
  IconClipboardCheck,
  IconLock,
  IconMail,
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
];

export const DashboardLayoutContainer = () => {
  return <DashboardLayout menuItems={MENU_ITEMS} />;
};
