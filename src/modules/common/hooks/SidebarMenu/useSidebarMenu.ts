import { useRouterState } from "@tanstack/react-router";
import { useMemo } from "react";
import type { SidebarMenuItem } from "@/modules/common/components";

interface UseSidebarMenuProps {
  items: SidebarMenuItem[];
}

const normalizePath = (path: string) => path.replace(/\/+$/, "");

const decorateItems = (
  menuItems: SidebarMenuItem[],
  isActive: (to: string) => boolean,
): SidebarMenuItem[] =>
  menuItems.map((item) => ({
    ...item,
    active: item.to ? isActive(item.to) : false,
    children: item.children?.length ? decorateItems(item.children, isActive) : undefined,
  }));

export const useSidebarMenu = ({ items }: UseSidebarMenuProps) => {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  const menuItems = useMemo(() => {
    const isActive = (to: string) => normalizePath(pathname) === normalizePath(to);
    return decorateItems(items, isActive);
  }, [items, pathname]);

  return { menuItems };
};
