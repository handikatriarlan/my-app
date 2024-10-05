import React, { useState, useEffect } from 'react';

function Square({ value, onClick }) {
  return (
    <button
      className="w-20 h-20 bg-blue-500 text-white text-3xl font-bold border-2 border-white focus:outline-none hover:bg-blue-600 transition duration-300 ease-in-out"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [status, setStatus] = useState('');

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  useEffect(() => {
    const result = calculateWinner(squares);
    if (result) {
      setWinner(result);
      setStatus(`Winner: ${result}`);
    } else if (!squares.includes(null)) {
      setStatus("It's a draw!");
      setWinner('Draw');
    } else {
      setStatus(`Next player: ${isXNext ? 'X' : 'O'}`);
    }
  }, [squares, isXNext]);

  useEffect(() => {
    if (winner) {
      setTimeout(() => {
        setSquares(Array(9).fill(null));
        setWinner(null);
        setStatus(`Next player: X`);
        setIsXNext(true);
      }, 2000);
    }
  }, [winner]);

  const renderSquare = (index) => {
    return <Square value={squares[index]} onClick={() => handleClick(index)} />;
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`text-2xl font-bold mb-4 p-2 ${winner ? 'text-green-500' : 'text-blue-600'} animate-pulse`}>
        {status}
      </div>

      {/* Board */}
      <div className="grid grid-cols-3 gap-1">
        {Array(9).fill(null).map((_, i) => renderSquare(i))}
      </div>

      {/* Footer Text */}
      {/* <div className="mt-4 text-sm text-gray-500 italic">
        Refreshing after the game result...
      </div> */}
    </div>
  );
}

function calculateWinner(squares) {
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Board />
    </div>
  );
}

export default App;
