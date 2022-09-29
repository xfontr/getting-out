import { useEffect, useState } from "react";
import useMovements from "../../hooks/useMovements/useMovements";
import { Board, Position } from "../../types/gameBoard";
import Cell from "../Cell/Cell";
import FieldStyled from "./Field.styled";

export type FieldStypedProps = {
  fieldSize: number;
};

type FieldProps = {
  initialBoard: Board;
  isEditMode?: boolean;
  fieldSize?: number;
  onClick?: () => void;
};

const Field = ({
  initialBoard,
  fieldSize = 10,
  isEditMode = false,
  ...rest
}: FieldProps): JSX.Element => {
  const [player, setPlayer] = useState<Position>("1-1");
  const [currentBoard, setCurrentBoard] = useState<Board>(initialBoard);

  useEffect(() => {
    setCurrentBoard(initialBoard);
  }, [initialBoard]);

  useMovements(setCurrentBoard, setPlayer, player, currentBoard, isEditMode);

  const renderBoard: JSX.Element[] = [];

  currentBoard.forEach((type, position) => {
    renderBoard.push(
      <Cell
        cellType={type}
        position={position}
        board={currentBoard}
        setBoard={setCurrentBoard}
        player={player}
        key={position}
      />
    );
  });

  return (
    <div {...rest}>
      <FieldStyled fieldSize={fieldSize!}>{renderBoard}</FieldStyled>
    </div>
  );
};

export default Field;
