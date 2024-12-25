import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import { path } from 'framer-motion/client';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { path: '/case1', name: 'Tic-Tac-Toe' },
    { path: '/case2', name: 'Stack' },
    {path: '/case3', name: 'Queue'},
    { path: '/case4', name: 'Binary Tree' },
    {path: '/case5', name: 'BST with Traversal'},
    {path: '/case6', name: 'Towers of Hanoi'}
  ];

  return (
    <div className="relative">
      {/* Menu Button */}
      {!isOpen && (
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={toggleDrawer}
            className="p-2 bg-[#b71c1c] text-white rounded-full shadow-md hover:bg-red-500 transition"
          >
            <FiMenu size={24} />
          </button>
        </div>
      )}

      {/* Drawer */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        // transition={{ duration: 0.5, ease: 'easeInOut' }}
        // transition={{ duration: 0.5, ease: 'linear' }}
        // transition={{ duration: 0.5, ease: 'easeOut' }}
        // transition={{ duration: 0.5, ease: 'easeIn' }}
        transition={{ type: 'tween', duration: 0.5, }}
        // transition={{ type: 'spring', stiffness: 70 }}
        // transition={{ type: 'keyframes', duration: 0.7, ease: 'easeInOut' }}
        className="fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-white to-gray-100 shadow-lg z-40 p-6 bg-opacity-20"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Navigation</h2>
        <ul className="space-y-4">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="block text-lg font-medium text-gray-700 hover:text-blue-500 transition"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-black z-30"
          onClick={toggleDrawer}
        ></motion.div>
      )}
    </div>
  );
};

export default Navbar;
