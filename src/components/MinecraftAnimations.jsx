import React from "react";
import { motion } from "framer-motion";

const FloatingBlock = ({ imagePath, delay, yOffset, duration, scale, left }) => (
    <motion.img
      src={imagePath}
      className="absolute pointer-events-none"
      initial={{ y: 0, opacity: 0 }}
      animate={{ 
        y: [-yOffset, 0, -yOffset],
        opacity: [0, 1, 0]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
      style={{ width: `${scale}px`, height: `${scale}px`, left: `${left}px` }}
    />
  );
  
  const MinecraftAnimations = () => (
    <>
    {/* left */}
      <div className="fixed left-0 top-0 h-screen w-1/4">
        <FloatingBlock imagePath="/svg/golden-apple.svg" delay={0} yOffset={20} duration={4} scale={48} left={50} />
        <FloatingBlock imagePath="/svg/red-apple.svg" delay={2} yOffset={30} duration={5} scale={48} left={100} />
        <FloatingBlock imagePath="/svg/golden-apple.svg" delay={1} yOffset={25} duration={3} scale={32} left={150} />
      </div>
      <div className="fixed left-48 top-10 h-screen w-1/4">
        <FloatingBlock imagePath="/svg/golden-apple.svg" delay={0} yOffset={20} duration={4} scale={48} left={50} />
        <FloatingBlock imagePath="/svg/red-apple.svg" delay={2} yOffset={30} duration={5} scale={48} left={100} />
        <FloatingBlock imagePath="/svg/golden-apple.svg" delay={1} yOffset={25} duration={3} scale={32} left={150} />
      </div>
      <div className="fixed left-0 top-[50%] h-screen w-1/4">
        <FloatingBlock imagePath="/svg/golden-apple.svg" delay={0} yOffset={20} duration={4} scale={48} left={50} />
        <FloatingBlock imagePath="/svg/red-apple.svg" delay={2} yOffset={30} duration={5} scale={48} left={100} />
        <FloatingBlock imagePath="/svg/golden-apple.svg" delay={1} yOffset={25} duration={3} scale={32} left={150} />
      </div>
      <div className="fixed left-48 top-[60%] h-screen w-1/4">
        <FloatingBlock imagePath="/svg/golden-apple.svg" delay={0} yOffset={20} duration={4} scale={48} left={50} />
        <FloatingBlock imagePath="/svg/red-apple.svg" delay={2} yOffset={30} duration={5} scale={48} left={100} />
        <FloatingBlock imagePath="/svg/golden-apple.svg" delay={1} yOffset={25} duration={3} scale={32} left={150} />
      </div>
      <div className="fixed left-0 top-[80%] h-screen w-1/4">
        <FloatingBlock imagePath="/svg/golden-apple.svg" delay={0} yOffset={20} duration={4} scale={48} left={50} />
        <FloatingBlock imagePath="/svg/red-apple.svg" delay={2} yOffset={30} duration={5} scale={48} left={100} />
        <FloatingBlock imagePath="/svg/golden-apple.svg" delay={1} yOffset={25} duration={3} scale={32} left={150} />
      </div>
      <div className="fixed left-48 top-[90%] h-screen w-1/4">
        <FloatingBlock imagePath="/svg/golden-apple.svg" delay={0} yOffset={20} duration={4} scale={48} left={50} />
        <FloatingBlock imagePath="/svg/red-apple.svg" delay={2} yOffset={30} duration={5} scale={48} left={100} />
        <FloatingBlock imagePath="/svg/golden-apple.svg" delay={1} yOffset={25} duration={3} scale={32} left={150} />
      </div>

      
      {/* right */}
      <div className="fixed right-0 top-0 h-screen w-1/4">
        <FloatingBlock imagePath="/svg/red-apple.svg" delay={1.5} yOffset={25} duration={4.5} scale={48} left={50} />
        <FloatingBlock imagePath="/svg/golden-apple.svg" delay={0.5} yOffset={20} duration={3.5} scale={32} left={100} />
        <FloatingBlock imagePath="/svg/red-apple.svg" delay={2.5} yOffset={30} duration={4} scale={32} left={150} />
      </div>
      <div className="fixed right-48 top-10 h-screen w-1/4">
        <FloatingBlock imagePath="/svg/red-apple.svg" delay={1.5} yOffset={25} duration={4.5} scale={48} left={50} />
        <FloatingBlock imagePath="/svg/golden-apple.svg" delay={0.5} yOffset={20} duration={3.5} scale={32} left={100} />
        <FloatingBlock imagePath="/svg/red-apple.svg" delay={2.5} yOffset={30} duration={4} scale={32} left={150} />
      </div>
      
        <div className="fixed right-0 top-[60%] h-screen w-1/4">
            <FloatingBlock imagePath="/svg/red-apple.svg" delay={1.5} yOffset={25} duration={4.5} scale={48} left={50} />
            <FloatingBlock imagePath="/svg/golden-apple.svg" delay={0.5} yOffset={20} duration={3.5} scale={32} left={100} />
            <FloatingBlock imagePath="/svg/red-apple.svg" delay={2.5} yOffset={30} duration={4} scale={32} left={150} />
        </div>
        <div className="fixed right-48 top-[50%] h-screen w-1/4">
            <FloatingBlock imagePath="/svg/red-apple.svg" delay={1.5} yOffset={25} duration={4.5} scale={48} left={50} />
            <FloatingBlock imagePath="/svg/golden-apple.svg" delay={0.5} yOffset={20} duration={3.5} scale={32} left={100} />
            <FloatingBlock imagePath="/svg/red-apple.svg" delay={2.5} yOffset={30} duration={4} scale={32} left={150} />
        </div>

        <div className="fixed right-0 top-[70%] h-screen w-1/4">
            <FloatingBlock imagePath="/svg/red-apple.svg" delay={1.5} yOffset={25} duration={4.5} scale={48} left={50} />
            <FloatingBlock imagePath="/svg/golden-apple.svg" delay={0.5} yOffset={20} duration={3.5} scale={32} left={100} />
            <FloatingBlock imagePath="/svg/red-apple.svg" delay={2.5} yOffset={30} duration={4} scale={32} left={150} />
        </div>
        <div className="fixed right-48 top-[80%] h-screen w-1/4">
            <FloatingBlock imagePath="/svg/red-apple.svg" delay={1.5} yOffset={25} duration={4.5} scale={48} left={50} />
            <FloatingBlock imagePath="/svg/golden-apple.svg" delay={0.5} yOffset={20} duration={3.5} scale={32} left={100} />
            <FloatingBlock imagePath="/svg/red-apple.svg" delay={2.5} yOffset={30} duration={4} scale={32} left={150} />
        </div>

    </>
  );
  
  export default MinecraftAnimations