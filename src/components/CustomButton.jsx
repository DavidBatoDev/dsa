import React from "react";
import clsx from "clsx";

// Props: variant, children, icon, onClick, className
const CustomButton = ({ variant = "default", children, icon: Icon, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-minecraftBold text-lg shadow-md transition-all duration-150",
        // Background variants
        {
          "bg-[#C28340] text-white hover:bg-brown-600 active:bg-brown-700 shadow-[0_4px_0_#1a1a1a]": variant === "arrival",
          "bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700 shadow-[0_4px_0_#1a1a1a]": variant === "departure",
          "bg-green-500 text-white hover:bg-green-600 active:bg-green-700 shadow-[0_4px_0_#1a1a1a]": variant === "departLastCar",
        },
        // Add rounded shadow to all buttons
        "border-2 border-black rounded-md",
        className // Allow for additional styling
      )}
      style={{
        textShadow: "1px 1px 0 #000",
      }}
    >
      {/* Render Icon if passed */}
      {Icon && <Icon className="h-6 w-6" />}
      {children}
    </button>
  );
};

export default CustomButton;
