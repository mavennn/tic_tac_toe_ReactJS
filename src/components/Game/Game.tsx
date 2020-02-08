import React from "react";

import './Game.scss';
import Board from "../Board/Board";

interface IStep {
  squares: string[];
}

interface IGameProps {}

interface IGameState {
  history: IStep[];
  xIsNext: boolean;
  stepNumber: number;
}

class Game extends React.Component<IGameProps, IGameState> {
  constructor(props: IGameProps) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      xIsNext: true,
      stepNumber: 0 // номер шага, который сейчас отображается
    };
  }

  handleClick(i: number): void {
    const history: IStep[] = this.state.history.slice(0, this.state.stepNumber + 1);
    const current: IStep = history[this.state.stepNumber];
    const squares: string[] = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares
        }
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }

  jumpTo(step: number): void {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history: IStep[]= this.state.history;
    const current: IStep = history[this.state.stepNumber];
    const winner: string = calculateWinner(current.squares);

    let status: string;
    if (winner) {
      status = `Выиграл ${winner}`;
    } else {
      status = `Следующий ход: ${this.state.xIsNext ? "X" : "O"}`;
    }

    const moves = history.map((step, move): JSX.Element => {
      const desc: string = move ? "Перейти к ходу #" + move : "К началу игры";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            xIsNext={this.state.xIsNext}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

const calculateWinner = (squares: string[]): string => {
  const lines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Game;
