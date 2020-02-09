import React from "react";

import './Square.scss';

interface ISquareProps {
  value: string;
  onClick(): any;
}

const Square: React.FC<ISquareProps> = ({ value, onClick }) => (
  <button className="square" onClick={() => onClick()}>
    {value}
  </button>
);

export default Square;
