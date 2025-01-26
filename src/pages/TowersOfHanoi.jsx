import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/Button";

const TowerOfHanoi = () => {
  const [disks, setDisks] = useState(3);
  const [towers, setTowers] = useState([
    Array.from({ length: 3 }, (_, i) => 3 - i),
    [],
    [],
  ]);
  const [moves, setMoves] = useState(0);
  const [isSolved, setIsSolved] = useState(true);
  const [exceededMoves, setExceededMoves] = useState(false);
  const [draggedDisk, setDraggedDisk] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for the error message
  const [hoveredTower, setHoveredTower] = useState(null); // State to track hovered tower

  const minMoves = Math.pow(2, disks) - 1;

  useEffect(() => {
    document.title = 'Towers of Hanoi';
  }, []);

  useEffect(() => {
    const isComplete = towers[2].length === disks;
    setIsSolved(isComplete);
    setExceededMoves(moves > minMoves);
  }, [towers, moves, disks]);

  useEffect(() => {
    let interval = null;

    if (isTimerRunning && !isSolved) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, timer, isSolved]);

  const resetGame = () => {
    setTowers([Array.from({ length: disks }, (_, i) => disks - i), [], []]);
    setMoves(0);
    setIsSolved(false);
    setExceededMoves(false);
    setTimer(0);
    setIsTimerRunning(false);
    setErrorMessage(""); // Reset the error message
    setHoveredTower(null); // Reset hovered tower on reset
  };

  const handleDragStart = (disk) => {
    setDraggedDisk(disk);
    if (!isTimerRunning && !isSolved) {
      setIsTimerRunning(true);
    }
  };

  const handleDrop = (to) => {
    if (draggedDisk === null || isSolved) return;

    const from = towers.findIndex((tower) => tower.includes(draggedDisk));

    // Check if the move is valid
    if (
      from !== -1 &&
      (towers[to].length === 0 || towers[to][towers[to].length - 1] > draggedDisk)
    ) {
      const newTowers = towers.map((tower, index) => {
        if (index === from) {
          return tower.slice(0, -1);
        }
        if (index === to) {
          return [...tower, draggedDisk];
        }
        return tower;
      });
      setTowers(newTowers);
      setMoves(moves + 1);
      setErrorMessage(""); // Reset error message when a valid move is made
    } else {
      setErrorMessage("Invalid move! Disk is larger");
    }
    setDraggedDisk(null);
    setHoveredTower(null); // Reset hovered tower after drop
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center 
        bg-[url('/images/toh-bg.png')] bg-cover md:bg-[length:150%] lg:bg-[length:150%] bg-center 
        animate-panBackground p-6 relative"
    >
      <div className="flex items-center flex-col h-[500px] w-[90%] relative p-3 rounded-md border-4 border-gray-500 overflow-hidden">
        <div className="absolute h-full top-0 w-full items-center justify-center opacity-90 bg-[#D9D9D9] z-[1]"></div>
        <div className="text-center mb-4 z-10">
          <h1 className="font-minecraftBold text-3xl">Towers of Hanoi</h1>
          <input
            type="number"
            value={disks}
            min={3}
            max={5}
            onChange={(e) => {
              const num = parseInt(e.target.value);
              setDisks(num);
              setTowers([Array.from({ length: num }, (_, i) => num - i), [], []]);
              setMoves(0);
              setIsSolved(false);
              setExceededMoves(false);
              setTimer(0);
              setIsTimerRunning(false);
              setErrorMessage(""); // Reset error message when changing the number of disks
            }}
            className="text-center border border-black rounded-md p-2 font-pressStart bg-[#DFDF61] text-black"
          />
        </div>
        <div className="z-10 flex justify-center items-start gap-16 w-full max-w-4xl border-b-[30px] border-[#6B4226] opacity-100 rounded">
          {towers.map((tower, i) => (
            <div
              key={i}
              className={`w-60 flex justify-center`}
              onDragOver={(e) => {
                e.preventDefault();
                setHoveredTower(i); // Set hovered tower when dragging over
              }}
              onDrop={() => handleDrop(i)}
              onDragLeave={() => setHoveredTower(null)} // Reset hovered tower when dragging leaves
            >
              <div
                className={`flex flex-col items-center justify-end relative h-64 w-[30px] bg-[#6B4226] rounded-t-lg ${
                  hoveredTower === i ? "bg-yellow-600" : ""
                }`}
              >
                {tower.map((disk, index) => (
                  <motion.div
                    key={disk}
                    className={`absolute bg-white text-black font-bold text-center border border-black rounded-md cursor-grab ${
                      draggedDisk === disk ? "opacity-50" : "opacity-100"
                    }`}
                    draggable={index === tower.length - 1}
                    onDragStart={() => handleDragStart(disk)}
                    style={{
                      width: `${40 + disk * 20}px`,
                      height: "24px",
                      bottom: `${index * 26}px`,
                      left: `calc(50% - ${(40 + disk * 20) / 2}px)`,
                    }}
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="z-10 flex mt-4">
          <button
            onClick={resetGame}
            className="text-dark font-minecraftRegular rounded-lg p-1 border-2 border-black bg-[#DFDF61] hover:bg-gray-700"
          >
            Reset
          </button>
        </div>

        <div className="z-10 flex items-center gap-8 font-pressStart mt-1">
          <p className={`text-lg font-bold ${exceededMoves ? "text-red-500" : "text-black"}`}>
            Moves: {moves}
          </p>
          <p className="text-lg font-bold text-black">Time: {timer}s</p>
        </div>

        <AnimatePresence>
          {errorMessage && (
            <motion.div
              className="z-20 font-minecraftItalic absolute top-16 right-5 text-lg text-red-600 font-bold"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isSolved && (
            <motion.p
              className={`z-20 font-minecraftItalic absolute top-10 right-5 mt-6 text-lg ${
                exceededMoves ? "text-yellow-600" : "text-green-600"
              } font-bold`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
            >
              {exceededMoves
                ? "At least you did it, but with more moves than necessary!"
                : "Congratulations! You solved it!"}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TowerOfHanoi;
