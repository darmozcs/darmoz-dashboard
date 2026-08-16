import { Group, Paper, Title } from "@mantine/core";
import { PropsWithChildren } from "react";

interface PageHeaderProps extends PropsWithChildren {
  title: string;
}

export const PageHeader = ({ title, children }: PageHeaderProps) => {
  return (
    <Paper p="xs">
      <Group justify="space-between" align="center">
        <Title order={2}>{title}</Title>
        {children}
      </Group>
    </Paper>
  );
};
