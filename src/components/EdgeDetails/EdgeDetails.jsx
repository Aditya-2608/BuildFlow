import { useState, useEffect } from "react";
import { X, ArrowRight, HelpCircle } from "lucide-react";
import "./EdgeDetails.css";

export default function EdgeDetails({ edge, onClose }) {
  const [retainedEdge, setRetainedEdge] = useState(null);
  const [openStep, setOpenStep] = useState(null);

  useEffect(() => {
    if (edge) {
      setRetainedEdge(edge);
      setOpenStep(null);
    }
  }, [edge]);

  const isOpen = edge !== null;
  const renderEdge = edge || retainedEdge;

  if (!renderEdge) return null;

  return (
    <div className={`bf-inspector-container bf-edge-inspector ${isOpen ? "open" : ""}`}>
      <div className="bf-inspector">
        <div className="bf-inspector-header">
          <div className="bf-inspector-title-group">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#38bdf8",
                fontSize: "11px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              <span>Flow Connection</span>
            </div>
            <h2
              style={{
                marginTop: "4px",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontWeight: "700",
              }}
            >
              <span style={{ color: "#fff" }}>{renderEdge.source}</span>
              <ArrowRight size={14} style={{ color: "#475569" }} />
              <span style={{ color: "#fff" }}>{renderEdge.target}</span>
            </h2>
          </div>
          <button
            className="bf-inspector-close-btn"
            onClick={onClose}
            title="Close (ESC)"
          >
            <X size={16} />
          </button>
        </div>

        <div className="bf-inspector-divider" />

        <div className="bf-inspector-content">
          <div className="bf-inspector-section">
            <h4>Data Integration Roadmap</h4>
            <p
              style={{
                fontSize: "13px",
                color: "#94a3b8",
                lineHeight: "1.6",
                margin: "0 0 16px",
              }}
            >
              Step-by-step implementation guide to establish data communication and network
              protocols between these two components.
            </p>

            {renderEdge.data?.steps ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {renderEdge.data.steps.map((step, index) => (
                  <div
                    key={index}
                    style={{
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      background: "rgba(255, 255, 255, 0.02)",
                      borderRadius: "10px",
                      padding: "12px",
                    }}
                  >
                    <div
                      onClick={() => setOpenStep(openStep === index ? null : index)}
                      style={{
                        cursor: "pointer",
                        fontWeight: "700",
                        fontSize: "13px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: openStep === index ? "#38bdf8" : "#cbd5e1",
                        transition: "color 0.15s ease",
                      }}
                    >
                      <span>{step.title}</span>
                      <span style={{ fontSize: "10px", color: "#64748b" }}>
                        {openStep === index ? "▼" : "▶"}
                      </span>
                    </div>

                    {openStep === index && (
                      <div
                        style={{
                          marginTop: "10px",
                          fontSize: "12.5px",
                          color: "#94a3b8",
                          lineHeight: "1.6",
                          borderTop: "1px solid rgba(255, 255, 255, 0.03)",
                          paddingTop: "8px",
                        }}
                      >
                        <p style={{ margin: "0 0 10px", color: "#cbd5e1" }}>
                          {step.description}
                        </p>
                        <ul
                          style={{
                            paddingLeft: "18px",
                            margin: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                            color: "#cbd5e1",
                          }}
                        >
                          {step.tasks.map((task, taskIndex) => (
                            <li key={taskIndex}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  padding: "16px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "10px",
                  color: "#64748b",
                  fontSize: "13px",
                }}
              >
                <HelpCircle size={16} style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>No specific integration steps generated for this connection flow.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}