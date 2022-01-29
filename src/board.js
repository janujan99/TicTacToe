import React from "react";
import ReactDOM from "react-dom";
import "./Square.css";
import "./Board.css";

class Square extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="square" onClick={this.props.onClick}>
        {this.props.char}
      </div>
    );
  }
}
export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game_board: [null, null, null, null, null, null, null, null, null],
      x_turn: true,
      gameOver: false,
    };
  }
  checkWin(squareNum, gameBoard) {
    let ch = gameBoard[squareNum];
    let checkDiagonals = squareNum % 2 === 0 ? true : false;
    // check row of particular square
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
      if (Math.floor(possibleRowVals[i] / 3) === squareRow) {
        rowVals.push(possibleRowVals[i]);
      }
    }
    let rowWin = true;
    for (let i = 0; i < rowVals.length; i++) {
      if (gameBoard[rowVals[i]] !== ch) {
        rowWin = false;
      }
    }
    if (rowWin) return true;
    // check column of particular square
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
      if (gameBoard[colVals[i]] !== ch) {
        colWin = false;
      }
    }
    if (colWin) return true;

    if (checkDiagonals) {
      let topLeft =
        gameBoard[0] === ch && gameBoard[4] === ch && gameBoard[8] === ch;
      let topRight =
        gameBoard[2] === ch && gameBoard[4] === ch && gameBoard[6] === ch;
      if (topRight || topLeft) return true;
    }
    return false;
  }
  updateBoard(squareNum) {
    if (this.state.game_board[squareNum] || this.state.gameOver) {
      return;
    }
    let game_board = this.state.game_board.slice();
    if (this.state.x_turn) {
      game_board[squareNum] = "X";
    } else {
      game_board[squareNum] = "O";
    }
    let gameOver = false;

    if (this.checkWin(squareNum, game_board)) gameOver = true;

    this.setState({
      game_board: game_board,
      x_turn: !this.state.x_turn,
      gameOver: gameOver,
    });
    if (gameOver) alert("Game over: Winner is " + game_board[squareNum]);
  }
  render() {
    return (
      <div className="bigboard">
        <div className="row">
          <Square
            num={0}
            char={this.state.game_board[0]}
            onClick={() => this.updateBoard(0)}
          />
          <Square
            num={1}
            char={this.state.game_board[1]}
            onClick={() => this.updateBoard(1)}
          />
          <Square
            num={2}
            char={this.state.game_board[2]}
            onClick={() => this.updateBoard(2)}
          />
        </div>
        <div className="row">
          <Square
            num={3}
            char={this.state.game_board[3]}
            onClick={() => this.updateBoard(3)}
          />
          <Square
            num={4}
            char={this.state.game_board[4]}
            onClick={() => this.updateBoard(4)}
          />
          <Square
            num={5}
            char={this.state.game_board[5]}
            onClick={() => this.updateBoard(5)}
          />
        </div>
        <div className="row">
          <Square
            num={6}
            char={this.state.game_board[6]}
            onClick={() => this.updateBoard(6)}
          />
          <Square
            num={7}
            char={this.state.game_board[7]}
            onClick={() => this.updateBoard(7)}
          />
          <Square
            num={8}
            char={this.state.game_board[8]}
            onClick={() => this.updateBoard(8)}
          />
        </div>
        <button
          class="newgame"
          onClick={() =>
            this.setState({
              game_board: Array(9).fill(null),
              x_turn: true,
              gameOver: false,
            })
          }
        >
          New Game
        </button>
      </div>
    );
  }
}
