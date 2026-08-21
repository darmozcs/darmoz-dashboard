import {
  RolesMasterHeaderContainer,
  RolesMasterTableContainer,
} from "@/modules/roles/containers";
import { Box, Stack } from "@mantine/core";

export const Roles = () => {
  return (
    <Stack h="100%">
      <RolesMasterHeaderContainer />
      <Box flex={1} mih={0}>
        <RolesMasterTableContainer />
      </Box>
    </Stack>
  );
};
