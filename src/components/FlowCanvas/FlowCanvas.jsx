import { useMemo, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  useReactFlow,
} from "reactflow";

import "reactflow/dist/style.css";

import CustomNode from "../CustomNode/CustomNode";
import CustomEdge from "../CustomEdge/CustomEdge";
import { getLayoutedElements } from "../../Utils/graphLayout";

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const categoryColors = {
  frontend: "#3b82f6",
  backend: "#8b5cf6",
  gateway: "#06b6d4",
  database: "#10b981",
  cache: "#f59e0b",
  ai: "#ec4899",
  storage: "#fb923c",
  infrastructure: "#64748b",
  auth: "#ef4444",
  default: "#6366f1",
};

function FlowCanvas({
  nodes,
  edges,
  selectedNode,
  selectedEdge,
  setSelectedEdge,
  setSelectedNode,
}) {
  const { fitView } = useReactFlow();

  // Automatically center the view on generation or resizing
  useEffect(() => {
    if (nodes.length > 0) {
      const timer = setTimeout(() => {
        fitView({ duration: 800, padding: 0.25 });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [nodes, edges, fitView]);

  const handleEdgeClick = (_, edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  };

  const handleNodeClick = (_, node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  };

  const handlePaneClick = () => {
    setSelectedNode(null);
    setSelectedEdge(null);
  };

  const { nodes: layoutedNodes, edges: layoutedEdges } =
    useMemo(() => {
      const isNodeSelected = selectedNode !== null;

      return getLayoutedElements(
        nodes.map((n) => {
          const isSelected = selectedNode && selectedNode.id === n.id;
          const opacity = isNodeSelected ? (isSelected ? 1 : 0.3) : 1;

          return {
            ...n,
            type: "custom",
            style: {
              opacity: opacity,
              transition: "opacity 0.3s ease",
            },
          };
        }),
        edges.map((e) => {
          // Find source node category color
          const sourceNode = nodes.find((n) => n.id === e.source);
          const category = sourceNode?.data?.category?.toLowerCase() || "";
          const color = categoryColors[category] || categoryColors.default;

          // Check connectivity if a node is selected
          let isConnected = false;
          if (isNodeSelected) {
            isConnected = e.source === selectedNode.id || e.target === selectedNode.id;
          }

          let strokeWidth = 2;
          let strokeColor = color;
          let opacity = 1;

          if (isNodeSelected) {
            if (isConnected) {
              strokeWidth = 3.5;
              opacity = 1;
            } else {
              strokeWidth = 1.5;
              opacity = 0.12;
              strokeColor = "#334155"; // Dim unconnected edges
            }
          }

          return {
            ...e,
            type: "custom",
            animated: isNodeSelected ? isConnected : true,
            style: {
              stroke: strokeColor,
              strokeWidth: strokeWidth,
              opacity: opacity,
              transition: "stroke-width 0.3s ease, opacity 0.3s ease, stroke 0.3s ease",
            },
          };
        })
      );
    }, [nodes, edges, selectedNode]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "var(--bg)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <ReactFlow
        nodes={layoutedNodes}
        edges={layoutedEdges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{
          padding: 0.25,
        }}
        onEdgeClick={handleEdgeClick}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
      >
        <Background
          variant={BackgroundVariant.Lines}
          gap={32}
          size={1}
          color="rgba(255, 255, 255, 0.03)"
        />

        <MiniMap
          pannable
          zoomable
          style={{
            width: 140,
            height: 90,
            background: "rgba(17, 18, 22, 0.7)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            position: "absolute",
            bottom: 20,
            left: 20,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
          maskColor="rgba(255, 255, 255, 0.02)"
        />

        <Controls
          showInteractive={false}
          style={{
            display: "flex",
            flexDirection: "row",
            background: "rgba(17, 18, 22, 0.7)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
            padding: "4px",
            gap: "4px",
            bottom: 20,
            right: 20,
            left: "auto",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        />
      </ReactFlow>
    </div>
  );
}

export default FlowCanvas;