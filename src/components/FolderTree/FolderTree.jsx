import { useState } from "react";
import { Folder, FolderOpen, File, ChevronRight, ChevronDown } from "lucide-react";
import "./FolderTree.css";

function TreeNode({ node, depth = 0 }) {
  const [isOpen, setIsOpen] = useState(true);
  const isDirectory = node.type === "directory" || node.children;

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="bf-tree-node" style={{ paddingLeft: `${depth * 12}px` }}>
      <div
        className={`bf-tree-row ${isDirectory ? "directory" : "file"}`}
        onClick={isDirectory ? handleToggle : undefined}
      >
        {isDirectory ? (
          <>
            <span className="bf-tree-arrow">
              {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
            <span className="bf-tree-icon folder">
              {isOpen ? <FolderOpen size={16} /> : <Folder size={16} />}
            </span>
          </>
        ) : (
          <>
            <span className="bf-tree-arrow-spacer" />
            <span className="bf-tree-icon file">
              <File size={15} />
            </span>
          </>
        )}
        <span className="bf-tree-name">{node.name}</span>
      </div>

      {isDirectory && isOpen && node.children && (
        <div className="bf-tree-children">
          {node.children.map((child, idx) => (
            <TreeNode key={`${child.name}-${idx}`} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FolderTree({ structure }) {
  if (!structure || structure.length === 0) {
    return <div className="bf-tree-empty">No folder structure specified.</div>;
  }

  return (
    <div className="bf-folder-tree">
      {structure.map((node, idx) => (
        <TreeNode key={`${node.name}-${idx}`} node={node} />
      ))}
    </div>
  );
}
