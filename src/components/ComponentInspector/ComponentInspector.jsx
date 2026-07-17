import { useState, useEffect } from "react";
import { Clock, CheckSquare, Layers, AlertTriangle, Play, Sparkles, X } from "lucide-react";
import FolderTree from "../FolderTree/FolderTree";
import CodeViewer from "../CodeViewer/CodeViewer";
import { generateImplementation } from "../../services/implementationService";
import "./ComponentInspector.css";

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

export default function ComponentInspector({ node, details, loading, error, onClose }) {
  const [generatedCode, setGeneratedCode] = useState(null);
  const [generatingCode, setGeneratingCode] = useState(false);
  const [codeError, setCodeError] = useState(null);

  // Retention states to prevent content flashing during slide-out transitions
  const [retainedNode, setRetainedNode] = useState(null);
  const [retainedDetails, setRetainedDetails] = useState(null);

  useEffect(() => {
    if (node) {
      setRetainedNode(node);
      setRetainedDetails(details);
      setGeneratedCode(null);
      setCodeError(null);
      setGeneratingCode(false);
    }
  }, [node, details]);

  const isOpen = node !== null;
  const renderNode = node || retainedNode;
  const renderDetails = details || retainedDetails;

  if (!renderNode) return null;

  const accentColor =
    categoryColors[renderNode.data?.category?.toLowerCase()] || categoryColors.default;

  const handleGenerateCode = async () => {
    if (!renderDetails) return;
    try {
      setGeneratingCode(true);
      setCodeError(null);
      const codeFiles = await generateImplementation(renderNode, renderDetails);
      setGeneratedCode(codeFiles);
    } catch (err) {
      console.error(err);
      setCodeError("Failed to generate boilerplate code. Please try again.");
    } finally {
      setGeneratingCode(false);
    }
  };

  return (
    <div
      className={`bf-inspector-container ${isOpen ? "open" : ""}`}
      style={{ "--accent": accentColor }}
    >
      {loading ? (
        <div className="bf-inspector loading">
          <div className="bf-skeleton-header">
            <div className="bf-skeleton-circle shimmer" />
            <div className="bf-skeleton-title-group">
              <div className="bf-skeleton-line title shimmer" />
              <div className="bf-skeleton-line subtitle shimmer" />
            </div>
            <button className="bf-inspector-close-btn" onClick={onClose}>
              <X size={16} />
            </button>
          </div>
          <div className="bf-skeleton-meta-row">
            <div className="bf-skeleton-badge shimmer" />
            <div className="bf-skeleton-badge shimmer" />
          </div>
          <div className="bf-inspector-divider" />
          <div className="bf-skeleton-section">
            <div className="bf-skeleton-line section-title shimmer" />
            <div className="bf-skeleton-line p-line shimmer" />
            <div className="bf-skeleton-line p-line shimmer" />
          </div>
          <div className="bf-skeleton-section">
            <div className="bf-skeleton-line section-title shimmer" />
            <div className="bf-skeleton-tree shimmer" />
          </div>
        </div>
      ) : error ? (
        <div className="bf-inspector error-state">
          <div className="bf-inspector-header">
            <div className="bf-inspector-title-group" />
            <button className="bf-inspector-close-btn" onClick={onClose}>
              <X size={16} />
            </button>
          </div>
          <AlertTriangle size={36} className="bf-error-icon" />
          <h3>Failed to Load Blueprint</h3>
          <p>{error || "An error occurred while calling the architect service."}</p>
        </div>
      ) : (
        <div className="bf-inspector">
          <div className="bf-inspector-header">
            <div className="bf-inspector-title-group">
              <h2>{renderNode.data?.label || renderNode.id}</h2>
              <p className="subtitle">{renderNode.data?.subtitle || "Software Component"}</p>
            </div>
            <button className="bf-inspector-close-btn" onClick={onClose} title="Close Inspector (ESC)">
              <X size={16} />
            </button>
          </div>

          <div className="bf-inspector-meta">
            <div
              className="bf-meta-badge category"
              style={{ borderColor: `${accentColor}33`, color: accentColor }}
            >
              <Layers size={12} />
              <span>{renderNode.data?.category || "Component"}</span>
            </div>
            {renderNode.data?.technology && (
              <div className="bf-meta-badge tech">{renderNode.data.technology}</div>
            )}
            {renderDetails?.estimatedTime && (
              <div className="bf-meta-badge time">
                <Clock size={12} />
                <span>{renderDetails.estimatedTime}</span>
              </div>
            )}
          </div>

          <div className="bf-inspector-divider" />

          <div className="bf-inspector-content">
            {renderDetails?.purpose && (
              <div className="bf-inspector-section">
                <h4>Purpose</h4>
                <p className="purpose-text">{renderDetails.purpose}</p>
              </div>
            )}

            {renderDetails?.responsibilities && renderDetails.responsibilities.length > 0 && (
              <div className="bf-inspector-section">
                <h4>Key Responsibilities</h4>
                <ul className="bf-resp-list">
                  {renderDetails.responsibilities.map((resp, i) => (
                    <li key={i}>
                      <CheckSquare size={14} className="check-icon" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {renderDetails?.techStack && renderDetails.techStack.length > 0 && (
              <div className="bf-inspector-section">
                <h4>Component Tech Stack</h4>
                <div className="bf-tech-grid">
                  {renderDetails.techStack.map((tech, i) => (
                    <div key={i} className="bf-tech-card">
                      <div className="tech-name">{tech.name}</div>
                      <div className="tech-role">{tech.role}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {renderDetails?.folderStructure && renderDetails.folderStructure.length > 0 && (
              <div className="bf-inspector-section">
                <h4>Proposed Folder Structure</h4>
                <FolderTree structure={renderDetails.folderStructure} />
              </div>
            )}

            {renderDetails?.implementation && renderDetails.implementation.length > 0 && (
              <div className="bf-inspector-section">
                <h4>Implementation Plan</h4>
                <div className="bf-timeline">
                  {renderDetails.implementation.map((step, idx) => (
                    <div key={idx} className="bf-timeline-item">
                      <div className="bf-timeline-badge">{idx + 1}</div>
                      <div className="bf-timeline-content">
                        <h5>{step.title}</h5>
                        <p className="step-desc">{step.description}</p>
                        <ul className="step-tasks">
                          {step.tasks && step.tasks.map((task, tIdx) => (
                            <li key={tIdx}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {renderDetails?.bestPractices && renderDetails.bestPractices.length > 0 && (
              <div className="bf-inspector-section">
                <h4>Architect Best Practices</h4>
                <div className="bf-practices-box">
                  <ul>
                    {renderDetails.bestPractices.map((bp, i) => (
                      <li key={i}>{bp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="bf-inspector-divider" />

            <div className="bf-inspector-section code-generator">
              <h4>Boilerplate Code Blueprint</h4>
              <p className="desc">
                Generate core configuration files and server/client boilerplate code using Gemini architect
                intelligence.
              </p>

              {!generatedCode && !generatingCode && (
                <button className="bf-btn-generate-code" onClick={handleGenerateCode}>
                  <Play size={14} />
                  <span>Generate Component Code</span>
                </button>
              )}

              {generatingCode && (
                <div className="bf-code-generating">
                  <div className="bf-spinner small" />
                  <span>Generating production-ready files...</span>
                </div>
              )}

              {codeError && (
                <div className="bf-code-error">
                  <span>{codeError}</span>
                </div>
              )}

              {generatedCode && (
                <div className="bf-generated-code-wrapper">
                  <div className="bf-code-success-tag">
                    <Sparkles size={12} />
                    <span>AI Boilerplate Generated</span>
                  </div>
                  <CodeViewer files={generatedCode} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
