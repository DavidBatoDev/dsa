import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    document.title = 'Tic-Tac-Toie animation';
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
        return board[a];
      }
    }
    return null;
  };
  

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) setWinner(gameWinner);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const renderSquare = (index) => {
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`bg-gray-200 border-2 border-gray-400 flex justify-center items-center h-24 w-24 cursor-pointer text-3xl font-bold ${
          board[index] ? 'pointer-events-none' : ''
        }`}
        onClick={() => handleClick(index)}
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: board[index] ? 1 : 0 }}
          className={`${board[index] === 'X' ? 'text-yellow-500' : 'text-[#b71c1c]'}`}
        >
          {board[index]}
        </motion.span>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col items-center justify-center">
      {winner && <Confetti />}
      <h1 className="text-4xl font-bold text-[#b71c1c] mb-6">Tic-Tac-Toe</h1>
      <div className="mb-4 text-xl font-medium text-gray-700">
        {winner ? (
          <span className="text-green-600">{winner} Wins!</span>
        ) : board.every((square) => square !== null) ? (
          <span className="text-yellow-600">It’s a Draw!</span>
        ) : (
          <span>
            Next Move: <span className={isXNext ? "text-yellow-500" : "text-[#b71c1c]"}>{isXNext ? 'X' : 'O'}</span>
          </span>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((_, index) => renderSquare(index))}
      </div>
      <button
        onClick={resetGame}
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Restart Game
      </button>
    </div>
  );
};

export default TicTacToe;
