import { SyntheticEvent } from "react";
import {
  cellsInitialState,
  FieldProps,
} from "../../containers/FieldContainer/FieldContainer";
import limitedCells from "../../data/limitedCells";
import { Board, CellTypes } from "../../types/gameBoard";
import { columnOf, positionOf, rowOf } from "../handlePosition/handlePosition";
import { checkIfBoardMaximum, readBoard } from "../readBoard/readBoard";

const fieldEditorUtils = ({
  board,
  cells,
  editTool,
  setGameStatus,
  restartGame,
  setBoard,
  setCells,
  fieldSize,
}: FieldProps) => {
  const switchEditTool = ({ currentTarget: { id } }: SyntheticEvent): void => {
    const editTool = id as CellTypes;

    if (checkIfBoardMaximum(editTool, board)) {
      return;
    }

    setCells(readBoard(board));
    setGameStatus((gameStatus) => ({
      ...gameStatus,
      editMode: { ...gameStatus, editTool },
    }));
  };

  const resetBoard = (): void => {
    restartGame(setBoard);
    setCells(cellsInitialState);
  };

  const disableTools = (): void => {
    if (
      limitedCells
        .map((cell) => cells[cell] === 1 && editTool === cell)
        .includes(true)
    ) {
      setGameStatus((gameStatus) => ({
        ...gameStatus,
        editMode: { ...gameStatus, editTool: "blank" },
      }));
    }
  };

  const increaseSize = () => {
    setGameStatus((gameStatus) => ({
      ...gameStatus,
      game: { ...gameStatus.game, fieldSize: fieldSize + 1 },
    }));

    let newBoard: Board = new Map();

    board.forEach((cell, position) => {
      newBoard.set(position, cell);

      if (fieldSize - columnOf(position) === 1) {
        newBoard.set(positionOf(rowOf(position), fieldSize), cell);
      }
    });

    new Array(fieldSize + 1).fill("").forEach((_, index) => {
      newBoard.set(positionOf(fieldSize + 1, index), "blank");
    });

    setBoard(newBoard);
  };

  return { switchEditTool, resetBoard, disableTools, increaseSize };
};

export default fieldEditorUtils;
