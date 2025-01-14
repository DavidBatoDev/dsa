// src/components/AnimatedNode.jsx
import React from 'react';
import { Handle } from 'reactflow'; // Correct Import from 'reactflow'
import { motion } from 'framer-motion';

const AnimatedNode = ({ id, data, selected, dragging, sourcePosition, targetPosition, style }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }} // Animation on mount
      animate={{ scale: 1, opacity: 1 }} // Final state
      transition={{ duration: 0.5 }} // Animation duration
      style={{
        ...style,
        backgroundImage: 'url(/images/painting.png)', // Ensure correct path
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'MinecraftRegular, sans-serif',
        width: 100,
        height: 100,
        borderRadius: 10,
        // // Optional: Add border and shadow for better visibility
        // border: '2px solid #000',
        // boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
      }}
    >
      {/* Target Handle */}
      <Handle
        type="target"
        position="top"
        style={{ background: '#555' }}
        id="a"
      />
      
      {/* Node Content */}
      <div>{data.label}</div>
      
      {/* Source Handle */}
      <Handle
        type="source"
        position="bottom"
        style={{ background: '#555' }}
        id="b"
      />
    </motion.div>
  );
};

export default AnimatedNode;
