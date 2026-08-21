import {
  MailClientApplicationsMasterHeaderContainer,
  MailClientApplicationsMasterTableContainer,
} from "@/modules/mailClientApplications/containers";
import { Box, Stack } from "@mantine/core";

export const MailClientApplications = () => {
  return (
    <Stack h="100%">
      <MailClientApplicationsMasterHeaderContainer />
      <Box flex={1} mih={0}>
        <MailClientApplicationsMasterTableContainer />
      </Box>
    </Stack>
  );
};
