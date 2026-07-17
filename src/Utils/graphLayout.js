import dagre from "@dagrejs/dagre";

const nodeWidth = 320;
const nodeHeight = 120;

export function getLayoutedElements(nodes, edges) {
  const dagreGraph = new dagre.graphlib.Graph();

  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({
    rankdir: "LR", // Left-to-Right orientation

    ranksep: 320, // Spacing between horizontal layers

    nodesep: 80, // Spacing between nodes in the same vertical column

    edgesep: 80,

    marginx: 100,

    marginy: 100,

    align: "UL",
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const position = dagreGraph.node(node.id);

    return {
      ...node,

      targetPosition: "left", // Connect inputs to left handle

      sourcePosition: "right", // Connect outputs from right handle

      position: {
        x: position.x - nodeWidth / 2,
        y: position.y - nodeHeight / 2,
      },
    };
  });

  return {
    nodes: layoutedNodes,
    edges,
  };
}