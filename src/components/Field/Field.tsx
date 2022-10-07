import { HTMLAttributes, useEffect, useState } from "react";
import useMovements from "../../hooks/useMovements/useMovements";
import { Board, Position } from "../../types/gameBoard";
import { getLastCellByType } from "../../utils/readBoard/readBoard";
import Cell from "../Cell/Cell";
import FieldStyled, { FieldContainer } from "./Field.styled";

export type FieldStypedProps = {
  fieldSize: number;
};

interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  initialBoard: Board;
  isEditMode?: boolean;
  fieldSize?: number;
}

const Field = ({
  initialBoard,
  fieldSize = 10,
  isEditMode = false,
  ...rest
}: FieldProps): JSX.Element => {
  const [currentBoard, setCurrentBoard] = useState<Board>(initialBoard);
  const [player, setPlayer] = useState<Position>("4-4");

  useEffect(() => {
    setCurrentBoard(initialBoard);
    setPlayer(getLastCellByType("player", currentBoard));
  }, [initialBoard, currentBoard]);

  useMovements(
    setCurrentBoard,
    setPlayer,
    player,
    currentBoard,
    fieldSize,
    isEditMode
  );

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
      <FieldContainer>
        <FieldStyled fieldSize={fieldSize}>{renderBoard}</FieldStyled>
      </FieldContainer>
    </div>
  );
};

export default Field;
