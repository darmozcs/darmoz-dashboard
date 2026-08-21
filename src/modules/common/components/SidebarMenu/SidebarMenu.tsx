import { Box, NavLink } from "@mantine/core";
// 1. Importamos useMatchRoute de TanStack
import { Link, useMatchRoute, type LinkProps } from "@tanstack/react-router";
import { useState, type ComponentType } from "react";
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

// Mantine's NavLink hover background is a static CSS rule with the same
// specificity as anything the `styles` prop can generate, so it wins the
// cascade regardless of override order. Inline `style` always beats
// selector-based CSS, so hover is tracked manually and applied that way.
const HOVER_TRANSITION = "background-color 150ms ease";

export const SidebarMenu = ({ items, onNavigate }: SidebarMenuProps) => {
  const { t } = useTranslation("common");
  const matchRoute = useMatchRoute();
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  return (
    <Box component="nav">
      {items?.map((item) => {
        const isRouteActive = item.to ? !!matchRoute({ to: item.to }) : false;
        const isActive = item.active || isRouteActive;
        const isHovered = hoveredLabel === item.label;

        return item.children?.length ? (
          <NavLink
            key={item.label}
            label={t(item.label)}
            leftSection={item.icon && <item.icon size={16} />}
            active={isActive}
            onMouseEnter={() => setHoveredLabel(item.label)}
            onMouseLeave={() => setHoveredLabel(null)}
            style={{
              backgroundColor: isHovered
                ? "var(--mantine-color-primary-6)"
                : "transparent",
              color: "white",
              transition: HOVER_TRANSITION,
            }}
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
            onMouseEnter={() => setHoveredLabel(item.label)}
            onMouseLeave={() => setHoveredLabel(null)}
            style={{
              backgroundColor: isActive
                ? "var(--mantine-primary-color-4)"
                : isHovered
                  ? "var(--mantine-color-primary-6)"
                  : "transparent",
              color: "white",
              fontWeight: "bold",
              transition: HOVER_TRANSITION,
            }}
          />
        );
      })}
    </Box>
  );
};
