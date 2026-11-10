import { Box, Center, Grid, Loader, Stack } from "@mantine/core";
import { Background, Controls, MiniMap, ReactFlow, type NodeTypes } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { FlowNodeCard } from "../../components/FlowNodeCard/FlowNodeCard";
import { FlowToolbar } from "../../components/FlowToolbar/FlowToolbar";
import { IssuesPanel } from "../../components/IssuesPanel/IssuesPanel";
import { NodeInspector } from "../../components/NodeInspector/NodeInspector";
import { NodePalette } from "../../components/NodePalette/NodePalette";
import { NODE_TYPE_ORDER } from "../../const/nodeTypes.const";
import { FlowEditorProvider } from "../../contexts/flowEditor.context";
import { useFlowEditor } from "../../hooks/useFlowEditor/useFlowEditor";

// Todos los tipos usan la misma tarjeta; cambia el ícono y las salidas.
const NODE_COMPONENTS: NodeTypes = Object.fromEntries(
  NODE_TYPE_ORDER.map((type) => [type, FlowNodeCard]),
);

const CANVAS_HEIGHT = "calc(100vh - 260px)";

interface FlowEditorContainerProps {
  botId: string;
  flowId: string;
}

export const FlowEditorContainer = ({ botId, flowId }: FlowEditorContainerProps) => {
  const editor = useFlowEditor(botId, flowId);

  if (editor.isLoading) {
    return (
      <Center h={CANVAS_HEIGHT}>
        <Loader />
      </Center>
    );
  }

  return (
    <FlowEditorProvider startNodeId={editor.startNodeId} issues={editor.issues}>
      <Stack gap="xs">
        <FlowToolbar editor={editor} />
        <IssuesPanel issues={editor.issues} onSelectNode={editor.setSelectedId} />
        <Grid gap="xs">
          <Grid.Col span={{ base: 12, md: 2 }}>
            <NodePalette onAdd={editor.addNode} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Box h={CANVAS_HEIGHT} mih={420} style={{ border: "1px solid var(--mantine-color-gray-3)", borderRadius: 8 }}>
              <ReactFlow
                nodes={editor.nodes.map((node) => ({ ...node, selected: node.id === editor.selectedId }))}
                edges={editor.edges}
                nodeTypes={NODE_COMPONENTS}
                onNodesChange={editor.onNodesChange}
                onEdgesChange={editor.onEdgesChange}
                onConnect={editor.onConnect}
                onNodeClick={(_, node) => editor.setSelectedId(node.id)}
                onPaneClick={() => editor.setSelectedId(null)}
                deleteKeyCode={null}
                fitView
              >
                <Background />
                <Controls />
                <MiniMap pannable zoomable />
              </ReactFlow>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Box h={CANVAS_HEIGHT} mih={420}>
              <NodeInspector
                node={editor.selectedNode}
                isStart={editor.selectedId === editor.startNodeId}
                issues={editor.issues.filter((issue) => issue.nodeId === editor.selectedId)}
                otherFlows={editor.otherFlows}
                onChange={editor.updateNodeData}
                onSetStart={editor.setStartNodeId}
                onRemove={editor.removeNode}
              />
            </Box>
          </Grid.Col>
        </Grid>
      </Stack>
    </FlowEditorProvider>
  );
};
