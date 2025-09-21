import {
  Background,
  Controls,
  EdgeChange,
  MiniMap,
  NodeChange,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";
import { saveWorkflow } from "../services/api";
import { Sidebar } from "../components/layout/Sidebar";
import { useRef } from "react";
import { AiNode } from "../components/nodes/aiNode";
import { EmailNode } from "../components/nodes/emailNode";
import { SettingsPanel } from "../components/layout/SettingsPanel";

const initialNodes = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "jahanvi" } },
  { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
  { id: "n3", position: { x: 0, y: 200 }, data: { label: "Node 3" } },
];
const initialEdges = [
  { id: "n1-n2", source: "n1", target: "n2" },
  { id: "n2-n3", source: "n2", target: "n3" },
];

export default function WorkflowEditor() {
  const [selectedNode, setSelectedNode] = useState(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  //Adding the custom nodes
  const nodeTypes = {
    aiNode: AiNode,
    emailNode: EmailNode,
  };

  const onNodesChange = useCallback(
    (
      changes: NodeChange<{
        id: string;
        position: { x: number; y: number };
        data: { label: string };
      }>[]
    ) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange<{ id: string; source: string; target: string }>[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params: any) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault(); // to prevent the browser default behaviour
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onSelectionChange = useCallback((elements: any) => {
    if (elements && elements.nodes && elements.nodes.length > 0) {
      setSelectedNode(elements.nodes[0]);
    } else if (elements && elements.nodes && elements.nodes.length == 0) {
      setSelectedNode(null);
    }
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type || !reactFlowBounds) return;
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = {
        id: `${nodes.length + 1}`,
        type,
        position,
        data: { label: `${type}` },
      };
      setNodes((nodes) => nodes.concat(newNode));
    },
    [nodes]
  );
  console.log(selectedNode);

  return (
    <div
      style={{ width: "100vw", height: "100vh", display: "flex" }}
      ref={reactFlowWrapper}
    >
      <Sidebar />

      <div style={{ flexGrow: 1, position: "relative" }}>
        <ReactFlow
          style={{ width: "100%", height: "100%" }}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          onSelectionChange={onSelectionChange}
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
        <button
          style={{ position: "absolute", top: 10, right: 10, zIndex: 10 }}
          className="text-blue-500"
          onClick={() =>
            saveWorkflow({
              name: "My Workflow",
              nodes: nodes,
              edges: edges,
              userId: Math.random().toString(36).substring(7),
            })
          }
        >
          Save Workflow
        </button>
      </div>
      {selectedNode && <SettingsPanel node={selectedNode} />}
    </div>
  );
}
