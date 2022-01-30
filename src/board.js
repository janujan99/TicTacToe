import React, { useState } from "react";
import "./Square.css";
import "./Board.css";

function Square(props) {
  return (
    <div className="square" onClick={props.onClick}>
      {props.ch}
    </div>
  );
}
export function Board() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winnerMsg, setWinnerMsg] = useState(null);

  function checkWin(squareNum) {
    let ch = board[squareNum];
    let checkDiagonals = squareNum % 2 === 0 ? true : false;
    //check row of particular square
    let squareRow = Math.floor(squareNum / 3);
    let possibleRowVals = [
      squareNum - 2,
      squareNum - 1,
      squareNum,
      squareNum + 1,
      squareNum + 2,
    ];
    let rowVals = [];

    for (let i = 0; i < possibleRowVals.length; i++) {
      if (Math.floor(possibleRowVals[i] / 3) === squareRow)
        rowVals.push(possibleRowVals[i]);
    }

    let rowWin = true;

    for (let i = 0; i < rowVals.length; i++) {
      if (board[rowVals[i]] !== ch) rowWin = false;
    }

    if (rowWin) return true;

    //check column of particular square
    let possibleColVals = [
      squareNum - 6,
      squareNum - 3,
      squareNum,
      squareNum + 3,
      squareNum + 6,
    ];
    let colVals = [];

    for (let i = 0; i < possibleColVals.length; i++) {
      if (possibleColVals[i] >= 0 && possibleColVals[i] < 9)
        colVals.push(possibleColVals[i]);
    }

    let colWin = true;

    for (let i = 0; i < colVals.length; i++) {
      if (board[colVals[i]] !== ch) colWin = false;
    }

    if (colWin) return true;

    if (checkDiagonals) {
      let topLeft = board[0] === ch && board[4] === ch && board[8] === ch;
      let topRight = board[2] === ch && board[4] === ch && board[6] === ch;
      if (topRight || topLeft) return true;
    }

    return false;
  }

  function updateBoard(num) {
    if (board[num] || gameOver) return;
    let temp = board;
    temp[num] = xTurn ? "X" : "O";
    setBoard(temp);
    setTurn(!xTurn);
    if (checkWin(num)) {
      setGameOver(true);
      setWinnerMsg("Winner is " + temp[num] + "!");
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setTurn(true);
    setGameOver(false);
    setWinnerMsg(null);
  }

  return (
    <div className="bigboard">
      <div className="winnerMsg">{winnerMsg}</div>
      <div className="row">
        <Square ch={board[0]} onClick={() => updateBoard(0)} />
        <Square ch={board[1]} onClick={() => updateBoard(1)} />
        <Square ch={board[2]} onClick={() => updateBoard(2)} />
      </div>
      <div className="row">
        <Square ch={board[3]} onClick={() => updateBoard(3)} />
        <Square ch={board[4]} onClick={() => updateBoard(4)} />
        <Square ch={board[5]} onClick={() => updateBoard(5)} />
      </div>
      <div className="row">
        <Square ch={board[6]} onClick={() => updateBoard(6)} />
        <Square ch={board[7]} onClick={() => updateBoard(7)} />
        <Square ch={board[8]} onClick={() => updateBoard(8)} />
      </div>
      <button onClick={() => resetGame()}>🔄 New Game</button>
    </div>
  );
}
