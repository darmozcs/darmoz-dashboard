import {
  ScheduledEmailsMasterHeaderContainer,
  ScheduledEmailsMasterTableContainer,
} from "@/modules/scheduledEmails/containers";
import { Box, Stack } from "@mantine/core";

export const ScheduledEmails = () => {
  return (
    <Stack h="100%">
      <ScheduledEmailsMasterHeaderContainer />
      <Box flex={1} mih={0}>
        <ScheduledEmailsMasterTableContainer />
      </Box>
    </Stack>
  );
};
