import { getBezierPath } from "reactflow";
import "./CustomEdge.css";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const accentColor = style.stroke || "#6366f1";

  return (
    <>
      <path
        id={`${id}-glow`}
        className="bf-edge-glow"
        d={edgePath}
        fill="none"
        style={{
          "--edge-color": accentColor,
        }}
      />
      <path
        id={`${id}-bg`}
        className="bf-edge-bg"
        d={edgePath}
        fill="none"
        strokeWidth={12}
        stroke="transparent"
        style={{ cursor: "pointer" }}
      />
      <path
        id={id}
        className="bf-edge-path"
        d={edgePath}
        fill="none"
        markerEnd={markerEnd}
        style={{
          ...style,
          stroke: accentColor,
        }}
      />
    </>
  );
}
