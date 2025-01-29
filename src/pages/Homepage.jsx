import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import MinecraftBtn from "../components/MinecraftBtn";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  // Ref for the <audio> element
  const audioRef = useRef(null);

  // State to track whether audio is playing
  const [isPlaying, setIsPlaying] = useState(false);

  // Toggle audio playback
  const handleSoundToggle = () => {
    if (!audioRef.current) return;

    audioRef.current.volume = 0.7;

    if (!isPlaying) {
      // Start playing
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.warn("Playback failed:", err);
      });
    } else {
      // Pause
      audioRef.current.pause();
    }

    // Flip the isPlaying state
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {/* Audio element (no autoPlay) */}
      {/* how to lower volume here */}

      <audio ref={audioRef} src="/audio/homepage-bg.mp3" loop />

      {/* This is our main container with the background */}
      <div
        className="
          relative
          h-full w-full
          bg-[url('/images/home-bg.png')]
          bg-no-repeat
          bg-cover
          md:bg-[length:150%]
          lg:bg-[length:150%]
          animate-panBackground
          flex flex-col items-center
        "
      >
        {/* Sound Icon Button (Top-Right) */}
        <button
          onClick={handleSoundToggle}
          className="
            absolute top-4 right-4
            p-2
            bg-gray-700
            rounded
            text-white
            font-bold
            hover:bg-gray-600
            transition
          "
          style={{ textShadow: "1px 1px 0 #000" }}
        >
          {/* If using React Icons: isPlaying ? <FaVolumeMute /> : <FaVolumeUp /> */}
          {isPlaying ? <FaVolumeUp/> : <FaVolumeMute/>}
        </button>

        {/* Title Section */}
        <div className="absolute top-14 lg:left-1/2 lg:transform lg:-translate-x-1/2 text-center">
          <div className="relative inline-block">
            <img
              src="/svg/home-title.svg"
              className="w-[700px]"
              alt="DSA Project"
            />

            {/* Animate the yellow text using Framer Motion */}
            <motion.span
              className="
                absolute
                bottom-4 right-10
                text-yellow-300
                font-minecraftBold
                text-xs
                lg:text-xl
                tracking-wide
              "
              initial={{ rotate: 0, scale: 1 }}
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              est. 2025
            </motion.span>
          </div>
        </div>

        {/* Buttons */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 w-80">
          <MinecraftBtn onClick={() => navigate('/selection')} className="w-full">Play</MinecraftBtn>
          <MinecraftBtn onClick={() => navigate('/about')} className="w-full">About</MinecraftBtn>
        </div>

        {/* Footer text */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <p className="font-minecraftItalic text-lg text-white">
            BSCPE 2-4 &nbsp;|&nbsp; Group 12 
          </p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
