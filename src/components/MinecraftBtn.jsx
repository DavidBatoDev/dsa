// src/components/MinecraftBtn.jsx
import React from "react";
import clsx from "clsx";

const MinecraftBtn = ({ children, onClick, className }) => {
  // Preload the audio
  const clickSound = new Audio("/audio/button-click.mp3");

  // Wrap the onClick handler to play the sound first
  const handleClick = (e) => {
    // Play the sound
    clickSound.currentTime = 0;  // reset playback in case clicked repeatedly
    clickSound.play().catch((err) => {
      // If user hasn't interacted with the page yet, this may fail on some browsers
      console.log("Audio play failed:", err);
    });

    // Then call the parent's onClick if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        // 'pixel-corners',
        "relative inline-flex items-center justify-center",
        "font-minecraftRegular text-white",
        "bg-[#7f7f7f]",
        "border-2 border-[#1c1c1c]",
        "rounded-none",
        "px-6 py-2 text-base",
        "shadow-[0_2px_0_#3f3f3f]",
        "hover:bg-[#8f8f8f]",
        "active:translate-y-[2px] active:shadow-none",
        "transition-all duration-150",
        className
      )}
      style={{
        textShadow: "1px 1px 0 #000",
      }}
    >
      {children}
    </button>
  );
};

export default MinecraftBtn;
