import type { WaFlowIssue } from "@/models";
import { Alert, Anchor, List, Text } from "@mantine/core";
import { IconAlertTriangle, IconCircleCheck } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface IssuesPanelProps {
  issues: WaFlowIssue[];
  onSelectNode: (nodeId: string) => void;
}

export const IssuesPanel = ({ issues, onSelectNode }: IssuesPanelProps) => {
  const { t } = useTranslation("whatsapp");
  const errors = issues.filter((issue) => issue.severity === "error");

  if (issues.length === 0) {
    return null;
  }

  return (
    <Alert
      color={errors.length ? "red" : "yellow"}
      icon={errors.length ? <IconAlertTriangle /> : <IconCircleCheck />}
      title={
        errors.length
          ? t("editor.issues.errors", { count: errors.length })
          : t("editor.issues.warnings", { count: issues.length })
      }
    >
      <List size="sm" spacing={2}>
        {issues.map((issue, index) => (
          <List.Item key={`${issue.nodeId}-${index}`}>
            {issue.nodeId ? (
              <Anchor size="sm" onClick={() => onSelectNode(issue.nodeId ?? "")}>
                {issue.message}
              </Anchor>
            ) : (
              <Text size="sm">{issue.message}</Text>
            )}
          </List.Item>
        ))}
      </List>
    </Alert>
  );
};
