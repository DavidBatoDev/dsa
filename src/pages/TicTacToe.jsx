import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import MinecraftBtn from '../components/MinecraftBtn';
import InventoryTable from '../components/InventoryTable';
import MinecraftModal from '../components/MinecraftModal';

// Import the SVGs
import RedApple from '/svg/red-apple.svg';
import GoldenApple from '/svg/golden-apple.svg';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]); // Track the winning line indices

  const clickSound = new Audio('/audio/button-click.mp3');

  useEffect(() => {
    document.title = 'Tic-Tac-Toe';
  }, []);

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line }; // Return both the winner and the winning line
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O'; // X -> Red Apple, O -> Yellow Apple
    setBoard(newBoard);
    setIsXNext(!isXNext);
    clickSound.currentTime = 0; // Reset playback in case clicked repeatedly
    clickSound.play().catch((err) => {
      console.log('Audio play failed:', err);
    });

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult.winner);
      setWinningLine(gameResult.line); // Store the winning line indices
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine([]); // Reset the winning line
  };

  const renderSquare = (index) => {
    const isWinningSquare = winningLine.includes(index); // Check if the square is part of the winning line

    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          flex justify-center items-center 
          h-20 w-20 cursor-pointer shadow-craftingInset
          ${isWinningSquare ? 'bg-blue-400' : 'bg-minecraft-gray'} 
          ${board[index] ? 'pointer-events-none' : ''}
        `}
        onClick={() => handleClick(index)}
      >
        {board[index] === 'X' && (
          <motion.img
            src={RedApple}
            alt="Red Apple"
            className="h-12 w-12"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          />
        )}
        {board[index] === 'O' && (
          <motion.img
            src={GoldenApple}
            alt="Golden Apple"
            className="h-12 w-12"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          />
        )}
      </motion.div>
    );
  };

  return (
    <>
        {/* <MinecraftModal>
          <div className='text-white'>
          </div>
        </MinecraftModal> */}
        <div
          className="min-h-screen flex flex-col items-center justify-center 
            bg-[url('/images/tictactoe-bg.png')] bg-cover md:bg-[length:150%] lg:bg-[length:150%] bg-center 
            animate-panBackground"
        >

        
          {winner && <Confetti />}

          {/* Header */}
          <div className="flex items-center justify-center space-x-4 mb-4">
            <MinecraftBtn onClick={resetGame} className="w-10 h-10 rounded shadow-md">
              <span className="font-minecraftRegular">↻</span>
            </MinecraftBtn>
            {/* Restart Button */}
            <MinecraftBtn
              onClick={resetGame}
              className="px-6 py-2 text-white rounded-lg shadow-md transition"
            >
              Another Round?
            </MinecraftBtn>
            <MinecraftBtn onClick={() => window.location.reload()} className="w-10 h-10 rounded shadow-md">
              <span className="font-minecraftRegular">✕</span>
            </MinecraftBtn>
          </div>

          {/* Game Board */}
          <div className="pixel-corners bg-minecraft-whiteSecondary border-0 border-black rounded-xl shadow-craftingBoard p-6">
            <h2 className="text-2xl font-minecraftRegular text-black text-center mb-4">Tic Tac Toe</h2>
            <div className="grid grid-cols-3 gap-2">
              {board.map((_, index) => renderSquare(index))}
            </div>
          </div>

          {/* Next Move */}
          <div className="flex items-center mt-6">
            <InventoryTable
            data={[
              "N",
              "E",
              "X",
              "T",
              " ",
              "M",
              "O",
              "V",
              "E",
              ":",
              <img
                src={isXNext ? RedApple : GoldenApple}
                alt="Next Move"
                className="w-[30px] h-[30px]"
              />,
            ]}
              className="bg-minecraft-whiteSecondary p-1 rounded shadow-craftingInset border border-[#8B8B8B]"
              cellClassName="text-white font-pressStart text-sm w-[54.472px] h-[54.472px]"
            />
          </div>
        </div>
    </>
  );
};

export default TicTacToe;
