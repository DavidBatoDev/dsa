// src/components/DirtNode.jsx
import React from 'react';
import { Handle } from 'reactflow';
import './DirtNode.css'; // Optional: for additional styling

const DirtNode = ({ data }) => {
  return (
    <div className="dirt-node">
      {/* Optional: Handles for connections */}
      <Handle type="target" position="top" />
      <div className="node-content">
        {data.label}
      </div>
      <Handle type="source" position="bottom" />
    </div>
  );
};

export default DirtNode;
