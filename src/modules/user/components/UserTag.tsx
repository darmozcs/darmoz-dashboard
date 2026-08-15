import { Avatar, Group, Stack, Text } from "@mantine/core";

interface UserTagProps {
  email: string | null;
  roles: string[];
}

export const UserTag = ({ email, roles }: UserTagProps) => {
  return (
    <Group wrap="nowrap" gap="sm">
      <Avatar name={email ?? "User"} color="initials" radius="xl" />
      <Stack gap={0} className="min-w-0 flex-1">
        <Text fw={600} truncate c="white">
          {email}
        </Text>
        <Text truncate c="white">
          {roles.join(", ")}
        </Text>
      </Stack>
    </Group>
  );
};
