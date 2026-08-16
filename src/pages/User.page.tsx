import {
  UserMasterHeaderContainer,
  UsersMasterTableContainer,
} from "@/modules/users/containers";
import { Box, Stack } from "@mantine/core";

export const User = () => {
  return (
    <Stack h="100%">
      <UserMasterHeaderContainer />
      <Box flex={1} mih={0}>
        <UsersMasterTableContainer />
      </Box>
    </Stack>
  );
};
