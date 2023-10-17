import React from "react";
import "../App.css";

//function to return a box
const Square = ({
  value, //the value to be shown on the box
  onSquareClick, //the function to be executed on click
}: {
  value: string;
  onSquareClick: () => void;
}) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Square;
