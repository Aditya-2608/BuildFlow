import { useState, useRef, useEffect } from "react";
import { Download, Settings, User, Edit2, Check } from "lucide-react";
import "./WorkspaceHeader.css";

export default function WorkspaceHeader({ idea, onGenerate, isLoading }) {
  const [isEditing, setIsEditing] = useState(false);
  const [promptText, setPromptText] = useState(idea);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setPromptText(idea);
  }, [idea]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRegenerate = () => {
    if (!promptText.trim() || isLoading) return;
    setIsEditing(false);
    onGenerate(promptText);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleRegenerate();
    }
    if (e.key === "Escape") {
      setPromptText(idea);
      setIsEditing(false);
    }
  };

  return (
    <header className="bf-workspace-header">
      <div className="bf-wh-left">
        <h1 className="bf-wh-logo">BuildFlow</h1>
        <span className="bf-wh-badge">AI Architect</span>
        <div className="bf-wh-divider" />

        {isEditing ? (
          <div className="bf-wh-prompt-edit-container">
            <input
              type="text"
              className="bf-wh-prompt-input"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <button
              className="bf-wh-prompt-btn check"
              onClick={handleRegenerate}
              disabled={isLoading || !promptText.trim()}
            >
              <Check size={14} />
            </button>
          </div>
        ) : (
          <div className="bf-wh-prompt-display" onClick={() => setIsEditing(true)}>
            <span className="bf-wh-prompt-text">{idea || "Enter a prompt..."}</span>
            <Edit2 size={12} className="bf-wh-edit-icon" />
          </div>
        )}
      </div>

      <div className="bf-wh-right">
        <div className="bf-wh-dropdown-container" ref={dropdownRef}>
          <button
            className="bf-wh-btn secondary"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Download size={14} />
            <span>Export</span>
          </button>

          {dropdownOpen && (
            <div className="bf-wh-dropdown">
              <div className="bf-wh-dropdown-header">Export Project Blueprint</div>
              <button
                className="bf-wh-dropdown-item"
                onClick={() => {
                  setDropdownOpen(false);
                  alert("Exporting project JSON structure...");
                }}
              >
                Export JSON Data
              </button>
              <button
                className="bf-wh-dropdown-item"
                onClick={() => {
                  setDropdownOpen(false);
                  alert("Generating system document blueprint...");
                }}
              >
                Export PDF Blueprint
              </button>
            </div>
          )}
        </div>

        <div className="bf-wh-divider" />

        <button
          className="bf-wh-icon-btn"
          title="Workspace Settings"
          onClick={() => alert("Settings under development")}
        >
          <Settings size={16} />
        </button>

        <button
          className="bf-wh-icon-btn profile"
          title="User Profile"
          onClick={() => alert("Profile under development")}
        >
          <User size={16} />
        </button>
      </div>
    </header>
  );
}
