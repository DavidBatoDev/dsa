// src/pages/BinaryTreeTraversal.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import Button from "../components/Button";
import AnimatedNode from "../components/AnimatedNode";

// Define nodeTypes outside the component to prevent React Flow warning
const nodeTypes = {
  animatedNode: AnimatedNode,
};

const BinaryTreeTraversal = () => {
  const [levels, setLevels] = useState(1); // Initialize to 1 for better UX
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // State for traversal modal
  const [isTraversalModalOpen, setIsTraversalModalOpen] = useState(false);
  const [traversalType, setTraversalType] = useState("");
  const [traversalResult, setTraversalResult] = useState("");

  const traversalIntervalRef = useRef(null);

  // Refit the view whenever nodes change using ReactFlow's fitView
  useEffect(() => {
    if (reactFlowInstance && nodes.length) {
      reactFlowInstance.fitView({
        padding: 0.2,
        includeHiddenNodes: false,
        duration: 800,
        easing: (t) => t,
      });
    }
  }, [nodes, reactFlowInstance]);

  const clearTraversal = () => {
    if (traversalIntervalRef.current) {
      clearInterval(traversalIntervalRef.current);
      traversalIntervalRef.current = null;
    }
    setTraversalResult("");
  };

  // Define the fitView function
  const handleFitView = () => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView({
        padding: 0.2,
        includeHiddenNodes: false,
        duration: 800,
        easing: (t) => t,
      });
    }
  };

  const createTree = (desiredLevels) => {
    clearTraversal();

    if (desiredLevels < 1 || desiredLevels > 5) {
      alert("Levels must be between 1 and 5!");
      return;
    }

    // Clear existing nodes and edges
    setNodes([]);
    setEdges([]);

    const baseHorizontalSpacing = 500 + 100 * (desiredLevels - 1); // Dynamic spacing
    const verticalSpacing = 200;

    const generateTreeData = (
      level,
      value = 1,
      x = 0,
      y = 0,
      parentId = null
    ) => {
      if (level > desiredLevels) return { nodes: [], edges: [] };

      const horizontalSpacing = baseHorizontalSpacing / Math.pow(2, level);
      const nodeId = value.toString();

      const node = {
        id: nodeId,
        data: { label: `Node ${value}` },
        position: { x, y },
        type: 'animatedNode',
        style: {
          width: 100,
          height: 100,
        }, 
        rightOrLeft: parentId ? (value % 2 === 0 ? "left" : "right") : "root",
      };

      const edges = [];
      if (parentId) {
        edges.push({
          id: `e${parentId}-${nodeId}`,
          source: parentId,
          target: nodeId,
          type: 'straight', 
          style: { stroke: "#8B4513", strokeWidth: 4 },
          arrowHeadType: 'arrowclosed', // Adds an arrowhead
        });
      }

      const leftChild = generateTreeData(
        level + 1,
        value * 2,
        x - horizontalSpacing,
        y + verticalSpacing,
        nodeId
      );
      const rightChild = generateTreeData(
        level + 1,
        value * 2 + 1,
        x + horizontalSpacing,
        y + verticalSpacing,
        nodeId
      );

      return {
        nodes: [node, ...leftChild.nodes, ...rightChild.nodes],
        edges: [...edges, ...leftChild.edges, ...rightChild.edges],
      };
    };

    const treeData = generateTreeData(1, 1, 0, 0);
    let time;
    if (desiredLevels === 1) {
      time = 400;
    } else if (desiredLevels === 2) {
      time = 650;
    } else if (desiredLevels === 3) {
      time = 950;
    } else if (desiredLevels === 4) {
      time = 1250;
    } else {
      time = 1550;
    }

    animateTreeConstruction(treeData.nodes, treeData.edges, desiredLevels);
    setTimeout(() => {
      handleFitView();
    }, time);
  };

  const animateTreeConstruction = (nodesData, edgesData, levels = 1) => {
    let currentLevel = 1;
    const maxLevel = levels;

    const time = 300; // Time interval between levels
    const interval = setInterval(() => {
      if (currentLevel > maxLevel) {
        clearInterval(interval);
        return;
      }

      const newNodes = nodesData.filter(
        (node) =>
          Math.floor(Math.log2(parseInt(node.id, 10)) + 1) === currentLevel
      );
      const newEdges = edgesData.filter(
        (edge) =>
          Math.floor(Math.log2(parseInt(edge.source, 10)) + 1) ===
            currentLevel - 1 &&
          Math.floor(Math.log2(parseInt(edge.target, 10)) + 1) ===
            currentLevel
      );

      setNodes((prev) => {
        // Avoid adding duplicate nodes
        const existingNodeIds = new Set(prev.map((node) => node.id));
        const filteredNewNodes = newNodes.filter(
          (node) => !existingNodeIds.has(node.id)
        );
        return [...prev, ...filteredNewNodes];
      });

      setEdges((prev) => {
        // Avoid adding duplicate edges
        const existingEdgeIds = new Set(prev.map((edge) => edge.id));
        const filteredNewEdges = newEdges.filter(
          (edge) => !existingEdgeIds.has(edge.id)
        );
        return [...prev, ...filteredNewEdges];
      });

      currentLevel++;
    }, time);
  };

  const handleGenerate = () => {
    createTree(levels);
    setIsModalOpen(false);
    // Reset traversal result when a new tree is generated
    setTraversalResult("");
  };

  // Memoizing nodeTypes to prevent React Flow warning
  // nodeTypes is defined outside the component, so no need to memoize here

  // Helper function to build a tree structure from nodes
  const buildTree = () => {
    if (nodes.length === 0) return null;

    const nodeMap = {};
    nodes.forEach((node) => {
      nodeMap[node.id] = { value: parseInt(node.id, 10), left: null, right: null };
    });

    edges.forEach((edge) => {
      const source = edge.source;
      const target = edge.target;
      if (parseInt(target, 10) === parseInt(source, 10) * 2) {
        nodeMap[source].left = nodeMap[target];
      } else if (parseInt(target, 10) === parseInt(source, 10) * 2 + 1) {
        nodeMap[source].right = nodeMap[target];
      }
    });

    return nodeMap["1"] || null; // Assuming "1" is the root
  };

  // Traversal functions
  const preorderTraversal = (node, result = []) => {
    if (!node) return result;
    result.push(node.value);
    preorderTraversal(node.left, result);
    preorderTraversal(node.right, result);
    return result;
  };

  const inorderTraversal = (node, result = []) => {
    if (!node) return result;
    inorderTraversal(node.left, result);
    result.push(node.value);
    inorderTraversal(node.right, result);
    return result;
  };

  const postorderTraversal = (node, result = []) => {
    if (!node) return result;
    postorderTraversal(node.left, result);
    postorderTraversal(node.right, result);
    result.push(node.value);
    return result;
  };

  const handleTraversalSelect = (type) => {
    clearTraversal();
    if (nodes.length === 0) {
      alert("Please generate a tree first!");
      return;
    }

    // Reset all node styles to default without unnecessary updates
    setNodes((prev) =>
      prev.map((node) => {
        const defaultStyle = { background: "transparent", color: "black" };
        const currentStyle = node.style || {};
        const needsUpdate =
          currentStyle.background !== defaultStyle.background ||
          currentStyle.color !== defaultStyle.color;

        if (needsUpdate) {
          return {
            ...node,
            style: {
              ...currentStyle,
              ...defaultStyle,
            },
          };
        }
        return node;
      })
    );

    // Determine the traversal order
    const treeRoot = buildTree();
    let traversalOrder = [];
    if (type === "Preorder") {
      traversalOrder = preorderTraversal(treeRoot);
    } else if (type === "Inorder") {
      traversalOrder = inorderTraversal(treeRoot);
    } else if (type === "Postorder") {
      traversalOrder = postorderTraversal(treeRoot);
    }

    // Highlight nodes one by one based on traversal order
    let currentIndex = 0;
    traversalIntervalRef.current = setInterval(() => {
      if (currentIndex >= traversalOrder.length) {
        clearTraversal();
        setTraversalResult(traversalOrder.join(" -> "));
        return;
      }

      const prevNodeId = traversalOrder[currentIndex - 1]?.toString(); // Previous node
      const currentNodeId = traversalOrder[currentIndex].toString(); // Current node

      setNodes((prev) =>
        prev.map((node) => {
          if (node.id === prevNodeId) {
            // Reset the previous node to its default color
            return {
              ...node,
              style: {
                ...node.style,
                background: "transparent", // Default color
                color: "black",
              },
            };
          } else if (node.id === currentNodeId) {
            // Highlight the current node
            return {
              ...node,
              style: {
                ...node.style,
                background: "#FFDE00", // Highlight color
                color: "black",
              },
            };
          }
          return node; // Leave other nodes unchanged
        })
      );

      setTraversalResult(
        traversalOrder.slice(0, currentIndex + 1).join(" -> ")
      );
      currentIndex++;
    }, 1000);

    setIsTraversalModalOpen(false);
  };

  const handleChooseTraversal = () => {
    if (nodes.length === 0) {
      alert("Please generate a tree first!");
      return;
    }
    setIsTraversalModalOpen(true);
  };

  const handleLevelChange = (newLevel) => {
    clearTraversal();
    setLevels(newLevel);
  };

  return (
    <div
      style={{
        backgroundImage: 'url(/images/binary-bg.png)', // Replace with your image path
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
        backgroundPosition: 'center', // Centers the image
      }}
      className="w-full h-screen relative py-[70px] px-[70px]"
    >
      {/* Modal for Levels */}
      {isModalOpen && (
        <div className="fixed inset-0 font-minecraftRegular bg-black bg-opacity-50 flex justify-center items-center z-30">
          <div className="bg-minecraft-whiteSecondary shadow-craftingInset p-6 rounded-lg w-96 text-center z-10">
            <h2 className="text-2xl font-bold mb-4">Enter Levels (1-5)</h2>
            <input
              type="number"
              value={levels}
              onChange={(e) =>
                handleLevelChange(
                  Math.min(5, Math.max(1, +e.target.value))
                )
              }
              className="p-2 border border-dark bg-transparent rounded text-center w-24 mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
              min="1"
              max="5"
            />
            <div className="flex justify-center space-x-4">
              <Button
                onClick={handleGenerate}
                className="text-dark px-4 py-2 rounded shadow-md transition"
              >
                Generate Tree
              </Button>
              <Button
                onClick={() => setIsModalOpen(false)}
                className="bg-delete text-dark px-4 py-2 rounded shadow-md hover:bg-red-400 transition"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Traversal Selection */}
      {isTraversalModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-2xl font-bold mb-4">Choose Traversal Type</h2>
            <div className="flex flex-col space-y-4">
              <Button
                onClick={() => handleTraversalSelect("Preorder")}
                className="bg-primary text-dark px-4 py-2 rounded shadow-md hover:bg-primary-light transition"
              >
                Preorder (TLR)
              </Button>
              <Button
                onClick={() => handleTraversalSelect("Inorder")}
                className="bg-primary text-dark px-4 py-2 rounded shadow-md hover:bg-primary-light transition"
              >
                Inorder (LTR)
              </Button>
              <Button
                variant="primary"
                onClick={() => handleTraversalSelect("Postorder")}
                className="text-dark px-4 py-2 rounded shadow-md hover:bg-primary-light transition"
              >
                Postorder (LRT)
              </Button>
              <Button
                variant="danger"
                onClick={() => setIsTraversalModalOpen(false)}
                className="text-dark px-4 py-2 rounded shadow-md hover:bg-red-400 transition"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tree */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes} // Register animated node type
        fitView
        onInit={setReactFlowInstance} // Capture the ReactFlow instance
        ref={reactFlowWrapper}
        style={{
          backgroundColor: '#8B8B8B',
          opacity: '0.8',
          strokeWidth: "7px",
          boxShadow: "-12px -12px 4px 0px #565656 inset, 12px 12px 4px 0px #FDFDFD inset"
        }}
        className="bg-url"
        panOnDrag={false} // Disables panning by dragging the canvas
        zoomOnScroll={false} // Disables zooming with the scroll wheel or touchpad
        zoomOnPinch={false} // Disables zooming with pinch gestures on touch devices
        panOnScroll={false} // Disables panning with the scroll wheel or touchpad
      >
        <Background color="#800000" gap={100} />
        <div className="absolute top-10 right-4">
          <Button
            onClick={handleChooseTraversal}
            variant="danger"
            className="text-dark px-4 py-2 rounded shadow-md cursor-pointer transition z-30"
          >
            Choose Traversal
          </Button>
        </div>
        {/* Reopen Modal Button */}
        {!isModalOpen && (
          <div className="absolute z-10 top-10 right-52">
            <Button
              variant="primary"
              onClick={() => setIsModalOpen(true)}
              className="text-dark px-4 py-2 rounded shadow-md hover:bg-primary-light transition"
            >
              Edit Levels
            </Button>
          </div>
        )}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-secondary-light bg-opacity-80 py-2 flex justify-center min-w-[800px] w-[1400px]">
          <span className="block text-sm text-gray-800">
            {traversalResult || ""}
          </span>
        </div>
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
};

export default BinaryTreeTraversal;
