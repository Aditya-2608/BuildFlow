import { useState } from "react";
import { Check, Copy, Code2 } from "lucide-react";
import "./CodeViewer.css";

export default function CodeViewer({ files }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!files || files.length === 0) return null;

  const currentFile = files[activeIdx];
  const lines = currentFile.code.split("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bf-code-viewer">
      <div className="bf-cv-header">
        <div className="bf-cv-tabs">
          {files.map((file, idx) => {
            const basename = file.path.split("/").pop();
            return (
              <button
                key={idx}
                className={`bf-cv-tab ${activeIdx === idx ? "active" : ""}`}
                onClick={() => {
                  setActiveIdx(idx);
                  setCopied(false);
                }}
              >
                <Code2 size={12} className="bf-cv-tab-icon" />
                <span>{basename}</span>
              </button>
            );
          })}
        </div>

        <button className="bf-cv-copy-btn" onClick={handleCopy}>
          {copied ? (
            <>
              <Check size={14} className="copied" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="bf-cv-path">{currentFile.path}</div>

      <div className="bf-cv-body">
        <div className="bf-cv-line-numbers">
          {lines.map((_, idx) => (
            <div key={idx} className="bf-cv-line-no">
              {idx + 1}
            </div>
          ))}
        </div>
        <pre className="bf-cv-pre">
          <code>{currentFile.code}</code>
        </pre>
      </div>
    </div>
  );
}
