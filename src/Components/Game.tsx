import React, { useState } from "react";
import Board from "./Board";
import "../App.css";

const Game = () => {
  //the entire game which has the board on left and the history of steps on right
  const [history, setHistory] = useState([Array(9).fill(null)]);
  //history containig an array of arrays showing all instances of the game initially all are empty
  const [currentMove, setCurrentMove] = useState(0);
  //current move contains the index at which we have to play the current step
  const xIsNext = currentMove % 2 === 0;
  //this variable tells us whether it will be X's turn or not
  const currentSquares = history[currentMove];
  // this returns the squares where the current game is played

  const handlePlay = (nextSquares: string[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    //we update the state of history by adding a new entry containing the square values for that particular step
  };

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
    //setCurrentMove changes the state of currentmove so that when you click on a button the board goes to that instance of that moves
  };

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
};

export default Game;
