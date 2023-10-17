import React from "react";
import Square from "./Square";
import calculateWinner from "../Service/CalculateWinner";
import "../App.css";
const Board = ({
  xIsNext, //if true the next click will show X or O
  squares, //return the array of squares to be shown
  onPlay, //once clicked the new instance is stored in history
}: {
  xIsNext: boolean;
  squares: string[];
  onPlay: (nextSquares: string[]) => void;
}) => {
  const handleClick = (i: number) => {
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
  };

  const winner = calculateWinner(squares); // returns X or O if the user won the game
  let status;
  if (winner) {
    status = "Winner: " + winner; //game over
  } else if (squares.every((ele) => ele !== null)) {
    status = "Tie"; //draw
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
};

export default Board;
