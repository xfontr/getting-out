import { useState } from "react";
import CellTypes from "../../types/CellTypes";
import Position from "../../types/Position";
import Cell from "../Cell/Cell";
import FieldStyled from "./Field.styled";

type FieldProps = {
  board: Map<Position, CellTypes>;
};

const Field = ({ board }: FieldProps): JSX.Element => {
  const [player] = useState<Position>("0-0");
  const renderBoard: JSX.Element[] = [];

  board.set(player, "player");

  board.forEach((type, position) => {
    renderBoard.push(
      <Cell cellType={type} position={position} key={position} />
    );
  });

  return <FieldStyled>{renderBoard}</FieldStyled>;
};

export default Field;
