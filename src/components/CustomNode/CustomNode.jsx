import { Handle, Position } from "reactflow";
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaAws,
} from "react-icons/fa";

import {
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiFirebase,
  SiNextdotjs,
  SiExpress,
  SiSupabase,
  SiMysql,
} from "react-icons/si";

import {
  Cpu,
  Layers3,
} from "lucide-react";

import "./CustomNode.css";

function getIcon(name = "") {
  const text = name.toLowerCase();

  if (text.includes("react")) return FaReact;
  if (text.includes("next")) return SiNextdotjs;

  if (text.includes("fastapi")) return SiFastapi;
  if (text.includes("express")) return SiExpress;
  if (text.includes("node")) return FaNodeJs;

  if (text.includes("postgres")) return SiPostgresql;
  if (text.includes("mysql")) return SiMysql;
  if (text.includes("mongo")) return SiMongodb;
  if (text.includes("redis")) return SiRedis;
  if (text.includes("firebase")) return SiFirebase;
  if (text.includes("supabase")) return SiSupabase;

  if (text.includes("docker")) return FaDocker;
  if (text.includes("aws")) return FaAws;

  return Cpu;
}

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

export default function CustomNode({ data }) {
  const Icon = getIcon(data.technology || data.label);

  const accent =
    categoryColors[
      data.category?.toLowerCase()
    ] || categoryColors.default;

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        className="bf-handle target"
      />

      <div
        className="bf-node"
        style={{
          "--accent": accent,
        }}
      >
        <div className="bf-node-glow" />

        <div className="bf-node-header">
          <div
            className="bf-node-icon"
            style={{
              background: `${accent}22`,
              borderColor: `${accent}55`,
            }}
          >
            <Icon size={22} />
          </div>

          <div className="bf-node-title-group">
            <h3>{data.label}</h3>

            <p>
              {data.subtitle || "Software Component"}
            </p>
          </div>
        </div>

        {data.description && (
          <div className="bf-node-description">
            {data.description}
          </div>
        )}

        <div className="bf-node-footer">
          <div
            className="bf-badge category"
            style={{
              borderColor: `${accent}66`,
              color: accent,
            }}
          >
            <Layers3 size={12} />

            <span>
              {data.category || "Component"}
            </span>
          </div>

          {data.technology && (
            <div className="bf-badge tech">
              {data.technology}
            </div>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="bf-handle source"
      />
    </>
  );
}