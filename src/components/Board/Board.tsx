import React from "react";

import './Board.scss';
import Square from "../Square/Square";

interface IBoardProps {
  squares: any;
  xIsNext: boolean;
  onClick(i: number): void;
}

class Board extends React.Component<IBoardProps> {
  constructor(props: IBoardProps) {
    super(props);

    this.state = {}
  }

  renderSquare(i: number): JSX.Element{
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
      return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
