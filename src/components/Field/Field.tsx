import { useState } from "react";
import useDirections from "../../hooks/useDirections";
import { Board, Position } from "../../types/gameBoard";
import Cell from "../Cell/Cell";
import FieldStyled from "./Field.styled";

type FieldProps = {
  initialBoard: Board;
};

const Field = ({ initialBoard }: FieldProps): JSX.Element => {
  const [player, setPlayer] = useState<Position>("1-1");
  const [currentBoard, setCurrentBoard] =
    useState<typeof initialBoard>(initialBoard);
  useDirections(setCurrentBoard, setPlayer, player, currentBoard);
  const renderBoard: JSX.Element[] = [];

  currentBoard.forEach((type, position) => {
    renderBoard.push(
      <Cell
        cellType={type}
        position={position}
        setBoard={setCurrentBoard}
        key={position}
      />
    );
  });

  return <FieldStyled>{renderBoard}</FieldStyled>;
};

export default Field;
