import { useState } from "react";
import "./App.css";

//function to return a box
function Square({
  value, //the value to be shown on the box
  onSquareClick, //the function to be executed on click
}: {
  value: string;
  onSquareClick: () => void;
}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({
  xIsNext, //if true the next click will show X or O
  squares, //return the array of squares to be shown
  onPlay, //once clicked the new instance is stored in history
}: {
  xIsNext: boolean;
  squares: string[];
  onPlay: (nextSquares: string[]) => void;
}) {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      // either if the square the user is clicking is already taken in the previous round or if all the squares are occupied the squares are unclickable
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    //taking the updates instance of the board
    onPlay(nextSquares); //saving the instance in history
  }

  const winner = calculateWinner(squares); // returns X or O if the user won the game
  let status;
  if (winner) {
    status = "Winner: " + winner; //game over
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O"); //next turn is X or O's..
  }

  return (
    //return the board with status on top
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  //the entire game which has the board on left and the history of steps on right
  const [history, setHistory] = useState([Array(9).fill(null)]);
  //history containig an array of arrays showing all instances of the game initially all are empty
  const [currentMove, setCurrentMove] = useState(0);
  //current move contains the index at which we have to play the current step
  const xIsNext = currentMove % 2 === 0;
  //this variable tells us whether it will be X's turn or not
  const currentSquares = history[currentMove];
  // this returns the squares where the current game is played

  function handlePlay(nextSquares: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    //we update the state of history by adding a new entry containing the square values for that particular step
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
    //setCurrentMove changes the state of currentmove so that when you click on a button the board goes to that instance of that moves
  }

  const moves = history.map((squares, move) => {
    // shows all the moves since begining of the game
    let description;
    if (move > 0) {
      description = "Go to move #" + move; //for any instance in the game
    } else {
      description = "Go to game start"; //for restarting the game
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
      // on click the game is taken to that instance
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: string[]) {
  //function to check if the any one has won the game
  //checks all possible lines i.e horizontally, vertically etc...
  //if X has won the function returns X
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
