import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavButtons = ({ onQuit, onRestart }) => {
  const navigate = useNavigate();
  const [quitDialogOpen, setQuitDialogOpen] = useState(false);
  const [restartDialogOpen, setRestartDialogOpen] = useState(false);

  const handleQuit = () => {
    if (onQuit) {
      onQuit();
    } else {
      navigate('/selection');
    }
    setQuitDialogOpen(false);
  };

  const handleRestart = () => {
    if (onRestart) {
        onRestart();
        setRestartDialogOpen(false);
    } else {
        window.location.reload();
        setRestartDialogOpen(false);
    }
  };

  // Custom Alert Dialog Component
  const AlertDialog = ({ isOpen, onClose, title, onConfirm }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 "
          onClick={onClose}
        />
        
        {/* Dialog */}
        <div className="pixel-corners bg-minecraft-white border-2 border-black p-6 relative z-10 min-w-[300px]">
          <h2 className="text-xl text-black font-minecraftBold text-center mb-6">{title}</h2>
          
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="pixel-corners bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white px-6 py-2 font-minecraftBold border-2 border-black shadow-[0_4px_0_#1a1a1a]"
            >
              No
            </button>
            <button
              onClick={onConfirm}
              className="pixel-corners bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-6 py-2 font-minecraftBold border-2 border-black shadow-[0_4px_0_#1a1a1a]"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="z-[9999999] fixed top-4 left-1/2 -translate-x-1/2 flex gap-2">
        {/* Quit Button */}
        <button
          onClick={() => setQuitDialogOpen(true)}
          className="z-[99999] text-white pixel-corners bg-[#7F7F7F] hover:bg-gray-600 active:bg-gray-700 p-2 w-12 h-12 flex items-center justify-center border-2 border-black shadow-[0_4px_0_#1a1a1a] transition-all"
        >
          <span className="font-minecraftBold">✕</span>
        </button>
        
        {/* Restart Button */}
        <button
          onClick={() => setRestartDialogOpen(true)}
          className="pixel-corners text-white  bg-[#7F7F7F]  hover:bg-gray-600 active:bg-gray-700 p-2 w-12 h-12 flex items-center justify-center border-2 border-black shadow-[0_4px_0_#1a1a1a] transition-all"
        >
          <span className="font-minecraftBold">↻</span>
        </button>
        
        {/* Help Button */}
        <button
          onClick={() => navigate('/about')}
          className="pixel-corners text-white bg-[#7F7F7F]  hover:bg-gray-600 active:bg-gray-700 p-2 w-12 h-12 flex items-center justify-center border-2 border-black shadow-[0_4px_0_#1a1a1a] transition-all"
        >
           <span className="font-minecraftBold">?</span>
        </button>
      </div>

      {/* Quit Dialog */}
      <AlertDialog
        isOpen={quitDialogOpen}
        onClose={() => setQuitDialogOpen(false)}
        title="Are you sure you want to quit?"
        onConfirm={handleQuit}
      />

      {/* Restart Dialog */}
      <AlertDialog
        isOpen={restartDialogOpen}
        onClose={() => setRestartDialogOpen(false)}
        title="Are you sure you want to restart?"
        onConfirm={handleRestart}
      />
    </>
  );
};

export default NavButtons;