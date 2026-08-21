import {
  ApplicationsMasterHeaderContainer,
  ApplicationsMasterTableContainer,
} from "@/modules/applications/containers";
import { Box, Stack } from "@mantine/core";

export const Applications = () => {
  return (
    <Stack h="100%">
      <ApplicationsMasterHeaderContainer />
      <Box flex={1} mih={0}>
        <ApplicationsMasterTableContainer />
      </Box>
    </Stack>
  );
};
