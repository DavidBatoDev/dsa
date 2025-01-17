import React from 'react';

const PatternedEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
}) => {
  return (
    <svg
      style={{
        position: 'absolute',
        overflow: 'visible',
        pointerEvents: 'none',
      }}
    >
      {/* Define the pixelated pattern */}
      <defs>
        <pattern
          id="pixelPattern"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <rect width="2" height="2" fill="#8B4513" />
          <rect x="2" y="2" width="2" height="2" fill="#8B4513" />
        </pattern>
      </defs>

      {/* Outer border line */}
      <line
        x1={sourceX}
        y1={sourceY}
        x2={targetX}
        y2={targetY}
        style={{
          stroke: '#000000', // Black border for contrast
          stroke: '#8B4513',
          strokeWidth: '15', // Thicker width for the border
          strokeLinecap: 'square', // Square ends
          shapeRendering: 'crispEdges', // Ensures pixel alignment
        }}
      />

      {/* Inner pixelated line */}
      <line
        x1={sourceX}
        y1={sourceY}
        x2={targetX}
        y2={targetY}
        style={{
          ...style,
          stroke: '#8B4513', // Use pixel pattern
          strokeWidth: '12', // Inner line width
          strokeLinecap: 'square', // Square ends
          shapeRendering: 'crispEdges', // Ensures pixel alignment
        }}
      />
    </svg>
  );
};

export default PatternedEdge;
