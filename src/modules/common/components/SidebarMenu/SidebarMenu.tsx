import { NAVBAR_LINK_PARENT_ROOT_STYLES } from "@/modules/common/const";
import { Box, NavLink } from "@mantine/core";
// 1. Importamos useMatchRoute de TanStack
import { Link, useMatchRoute, type LinkProps } from "@tanstack/react-router";
import { type ComponentType } from "react";
import { useTranslation } from "react-i18next";

export interface SidebarMenuItem {
  label: string;
  icon?: ComponentType<{ size?: string | number }>;
  to?: LinkProps["to"];
  active?: boolean;
  children?: SidebarMenuItem[];
}

interface SidebarMenuProps {
  items: SidebarMenuItem[];
  onNavigate?: () => void;
}

export const SidebarMenu = ({ items, onNavigate }: SidebarMenuProps) => {
  const { t } = useTranslation("common");

  const matchRoute = useMatchRoute();

  return (
    <Box component="nav">
      {items?.map((item) => {
        const isRouteActive = item.to ? !!matchRoute({ to: item.to }) : false;

        const isActive = item.active || isRouteActive;

        return item.children?.length ? (
          <NavLink
            key={item.label}
            label={t(item.label)}
            leftSection={item.icon && <item.icon size={16} />}
            styles={{
              root: NAVBAR_LINK_PARENT_ROOT_STYLES,
            }}
            active={isActive}
          >
            <SidebarMenu items={item.children} onNavigate={onNavigate} />
          </NavLink>
        ) : (
          <NavLink
            key={item.label}
            component={Link}
            to={item.to}
            label={t(item.label)}
            leftSection={item.icon && <item.icon size={16} />}
            onClick={onNavigate}
            active={isActive}
            styles={{
              root: {
                backgroundColor: isActive
                  ? "var(--mantine-primary-color-4)"
                  : "transparent",
                color: "white",
                fontWeight: "bold",
              },
            }}
          />
        );
      })}
    </Box>
  );
};
