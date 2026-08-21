import {
  EmailTemplatesMasterHeaderContainer,
  EmailTemplatesMasterTableContainer,
} from "@/modules/emailTemplates/containers";
import { Box, Stack } from "@mantine/core";

export const EmailTemplates = () => {
  return (
    <Stack h="100%">
      <EmailTemplatesMasterHeaderContainer />
      <Box flex={1} mih={0}>
        <EmailTemplatesMasterTableContainer />
      </Box>
    </Stack>
  );
};
