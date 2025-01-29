import React from "react";
import clsx from "clsx";

const CustomButton = ({ 
  variant = "default", 
  children, 
  icon: Icon, 
  onClick, 
  className,
  clickSound = "/audio/button-click.mp3", // Default sound path
  volume = 0.5 // Default volume
}) => {
  const playSound = () => {
    const audio = new Audio(clickSound);
    audio.volume = volume;
    audio.play().catch(error => {
      // Silently handle autoplay restrictions
      console.log("Audio playback failed:", error);
    });
  };

  const handleClick = (e) => {
    playSound();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "pixel-corners flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-minecraftBold text-lg shadow-md transition-all duration-150",
        // Background variants
        {
          "bg-[#C28340] text-white hover:bg-brown-600 active:bg-brown-700 shadow-[0_4px_0_#1a1a1a]": variant === "arrival",
          "bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700 shadow-[0_4px_0_#1a1a1a]": variant === "departure",
          "bg-green-500 text-white hover:bg-green-600 active:bg-green-700 shadow-[0_4px_0_#1a1a1a]": variant === "departLastCar",
          "bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700 shadow-[0_4px_0_#1a1a1a]": variant === "generateTree",
          "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-[0_4px_0_#1a1a1a]": variant === "clear",
          "bg-minecraft-white text-black hover:bg-minecraft-whiteSecondary active:bg-white shadow-[0_4px_0_#1a1a1a]": variant === "white",
          "bg-minecraft-gray text-white hover:bg-gray-600 active:bg-gray-700 shadow-[0_4px_0_#1a1a1a]": variant === "gray",
        },
        "border-2 border-black rounded-md",
        className
      )}
      style={{
        textShadow: "1px 1px 0 #000",
      }}
    >
      {Icon && <Icon className="h-6 w-6" />}
      {children}
    </button>
  );
};

export default CustomButton;