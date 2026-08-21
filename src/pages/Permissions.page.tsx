import {
  RolePermissionsMasterHeaderContainer,
  RolePermissionsMasterTableContainer,
} from "@/modules/rolePermissions/containers";
import { Box, Stack } from "@mantine/core";

export const Permissions = () => {
  return (
    <Stack h="100%">
      <RolePermissionsMasterHeaderContainer />
      <Box flex={1} mih={0}>
        <RolePermissionsMasterTableContainer />
      </Box>
    </Stack>
  );
};
