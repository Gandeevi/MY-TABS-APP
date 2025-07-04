// src/components/TreeNode.js
import React, { useState } from 'react';

const TreeNode = ({ node, onChange, parent, removeSelf }) => {
  const [childName, setChildName] = useState('');
  const [expanded, setExpanded] = useState(true);

  const addChild = () => {
    const name = prompt('Enter name of new node:');
    if (name && name.trim()) {
      node.children.push({ name: name.trim(), children: [] });
      onChange();
      setExpanded(true);
    }
  };

  const handleRemove = () => {
    if (window.confirm(`Delete "${node.name}"?`)) {
      removeSelf();
    }
  };

  return (
    <div className="ms-3 mt-1">
      <div className="d-flex align-items-center gap-2">
        {node.children.length > 0 && (
          <span
            style={{ cursor: 'pointer', width: '1em' }}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? '▼' : '▶'}
          </span>
        )}
        {!node.children.length && <span style={{ width: '1em' }}></span>}
        
        <span>{node.name}</span>

        <span
          style={{ cursor: 'pointer', color: 'green', marginLeft: '0.5em' }}
          onClick={addChild}
          title="Add Child"
        >
          ＋
        </span>

        {parent && (
          <span
            style={{ cursor: 'pointer', color: 'red' }}
            onClick={handleRemove}
            title="Delete Node"
          >
            －
          </span>
        )}
      </div>

      {expanded && node.children.map((child, index) => (
        <TreeNode
          key={index}
          node={child}
          parent={node}
          onChange={onChange}
          removeSelf={() => {
            node.children.splice(index, 1);
            onChange();
          }}
        />
      ))}
    </div>
  );
};

export default TreeNode;
