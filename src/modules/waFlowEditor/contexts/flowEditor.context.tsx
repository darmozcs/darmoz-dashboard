import type { WaFlowIssue } from "@/models";
import type { ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";

// Lo que los nodos del lienzo necesitan saber sin pasar por el data del nodo
// (que es lo que se guarda en el backend).
interface FlowEditorContextValue {
  startNodeId: string | null;
  issuesByNode: Map<string, WaFlowIssue[]>;
}

const FlowEditorContext = createContext<FlowEditorContextValue | undefined>(
  undefined,
);

interface FlowEditorProviderProps {
  startNodeId: string | null;
  issues: WaFlowIssue[];
  children: ReactNode;
}

export const FlowEditorProvider = ({
  startNodeId,
  issues,
  children,
}: FlowEditorProviderProps) => {
  const value = useMemo(() => {
    const issuesByNode = new Map<string, WaFlowIssue[]>();
    issues.forEach((issue) => {
      if (!issue.nodeId) return;
      issuesByNode.set(issue.nodeId, [...(issuesByNode.get(issue.nodeId) ?? []), issue]);
    });
    return { startNodeId, issuesByNode };
  }, [startNodeId, issues]);

  return (
    <FlowEditorContext.Provider value={value}>{children}</FlowEditorContext.Provider>
  );
};

export const useFlowEditorContext = () => {
  const context = useContext(FlowEditorContext);
  if (!context) {
    throw new Error("useFlowEditorContext must be used within FlowEditorProvider");
  }
  return context;
};
