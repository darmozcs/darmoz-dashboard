import type { SidebarMenuItem } from "@/modules/common/components";
import {
  IconAppWindow,
  IconClipboardCheck,
  IconDashboard,
  IconLock,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import { DashboardLayout } from "../../components/DashboardLayout/DashboardLayout";

const MENU_ITEMS: SidebarMenuItem[] = [
  {
    label: "menu.dashboard",
    to: "/dashboard",
    icon: IconDashboard,
  },
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
];

export const DashboardLayoutContainer = () => {
  return <DashboardLayout menuItems={MENU_ITEMS} />;
};
