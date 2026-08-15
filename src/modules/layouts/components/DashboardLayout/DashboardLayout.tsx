import type { SidebarMenuItem } from "@/modules/common/components";
import {
  LanguageMenuContainer,
  SidebarMenuContainer,
} from "@/modules/common/containers";
import { LogoutButtonContainer } from "@/modules/auth/containers";
import { UserTagContainer } from "@/modules/user/containers";
import { AppShell, Box, Burger, Flex, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "@tanstack/react-router";

interface DashboardLayoutProps {
  menuItems: SidebarMenuItem[];
  brand?: React.ReactNode;
}

export const DashboardLayout = ({ menuItems }: DashboardLayoutProps) => {
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="xs"
    >
      <AppShell.Header
        withBorder={false}
        bg={{ base: "primary.6", sm: "white" }}
      >
        <Group h="100%" px="md" justify="space-between">
          <Group gap="sm">
            <Burger
              opened={opened}
              onClick={toggle}
              color="white"
              hiddenFrom="sm"
            />
          </Group>
          <Group gap="xs">
            <LanguageMenuContainer />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar
        p={0}
        withBorder={false}
        bg="var(--mantine-primary-color-9)"
      >
        <Flex direction="column" h="100%">
          <Box p="md" color="white" bg="var(--mantine-primary-color-6)">
            <UserTagContainer />
          </Box>
          <Box flex={1}>
            <SidebarMenuContainer items={menuItems} onNavigate={close} />
          </Box>
          <Box p="md">
            <LogoutButtonContainer />
          </Box>
        </Flex>
      </AppShell.Navbar>

      <AppShell.Main bg="gray.2">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
