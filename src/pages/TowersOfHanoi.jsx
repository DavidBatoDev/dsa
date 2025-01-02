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
  const [isSolved, setIsSolved] = useState(false);
  const [exceededMoves, setExceededMoves] = useState(false);
  const [draggedDisk, setDraggedDisk] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

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
    }
    setDraggedDisk(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary-light text-black px-6">
      <h1 className="text-4xl font-extrabold mb-6">Tower of Hanoi</h1>
      
      <div className="flex flex-col items-center bg-secondary p-6 rounded-lg shadow-md border border-gray-300 mb-6 w-full max-w-xl">
        <label className="text-lg font-medium mb-2">Number of Disks:</label>
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
          }}
          className="w-20 text-center border border-black rounded-md py-2 px-4 bg-white text-black"
        />
      </div>

      <div className="flex justify-center items-start gap-32 w-full max-w-4xl">
        {towers.map((tower, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-end relative h-80 w-5 bg-[#6B4226] rounded-t-lg"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(i)}
          >
            {tower.map((disk, index) => (
              <motion.div
                key={disk}
                className={`absolute bg-yellow-400 text-black font-bold text-center border border-black rounded-md cursor-grab ${
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
              >
                {disk}
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex gap-6 mt-8">
        <Button
          onClick={resetGame}
          className="text-dark font-bold rounded-lg hover:bg-gray-700"
        >
          Reset
        </Button>
      </div>

      <div className="flex items-center gap-8 mt-6">
        <p className={`text-lg font-bold ${exceededMoves ? "text-red-500" : "text-black"}`}>
          Moves: {moves}
        </p>
        <p className="text-lg font-bold text-black">Time: {timer}s</p>
      </div>

      <AnimatePresence>
        {isSolved && (
          <motion.p
            className="mt-6 text-lg text-green-600 font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
          >
            Congratulations! You solved it!
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {exceededMoves && !isSolved && (
          <motion.p
            className="mt-6 text-lg text-red-500 font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
          >
            Exceeded optimal moves!
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TowerOfHanoi;
