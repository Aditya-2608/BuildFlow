import { useState } from "react";
import "./IdeaInput.css";

const SUGGESTED_PROMPTS = [
  "Netflix Clone",
  "AI SaaS",
  "Expense Tracker",
  "Discord Clone",
  "CRM",
  "Chat Application",
];

function IdeaInput({ onGenerate, isLoading }) {
  const [idea, setIdea] = useState("");

  const handleGenerate = () => {
    if (!idea.trim() || isLoading) return;
    onGenerate(idea);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="bf-landing-input-container">
      <div className="bf-landing-card">
        <div className="bf-card-label">Describe your project idea</div>

        <textarea
          rows={4}
          placeholder="Describe your system (e.g., 'E-commerce store with stripe payments and inventory monitoring')..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="bf-card-textarea"
        />

        <div className="bf-card-footer">
          <span className="bf-card-footer-logo">Powered by Gemini AI</span>
          <button
            onClick={handleGenerate}
            disabled={isLoading || !idea.trim()}
            className="bf-btn-generate"
          >
            {isLoading ? "Generating..." : "Generate Architecture"}
          </button>
        </div>
      </div>

      <div className="bf-suggested-prompts-section">
        <span className="bf-sps-label">Try templates:</span>
        <div className="bf-sps-list">
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => {
                if (!isLoading) setIdea(prompt);
              }}
              disabled={isLoading}
              className={`bf-sps-chip ${idea === prompt ? "active" : ""}`}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IdeaInput;