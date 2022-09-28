import { SyntheticEvent } from "react";
import {
  cellsInitialState,
  FieldProps,
} from "../../containers/FieldContainer/FieldContainer";
import limitedCells from "../../data/limitedCells";
import { CellTypes } from "../../types/gameBoard";
import { checkIfBoardMaximum, readBoard } from "../readBoard/readBoard";

const fieldEditorUtils = ({
  board,
  cells,
  editTool,
  setGameStatus,
  restartGame,
  setBoard,
  setCells,
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

  return { switchEditTool, resetBoard, disableTools };
};

export default fieldEditorUtils;
