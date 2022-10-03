import { SyntheticEvent } from "react";
import {
  cellsInitialState,
  FieldProps,
} from "../../containers/FieldContainer/FieldContainer";
import limitedCells from "../../data/limitedCells";
import { Board, CellTypes } from "../../types/gameBoard";
import generateBoard from "../generateBoard/generateBoard";
import { columnOf, positionOf, rowOf } from "../handlePosition/handlePosition";
import { checkIfBoardMaximum, readBoard } from "../readBoard/readBoard";

const maxFieldSize = 22;
const minFieldSize = 10;

const fieldEditorUtils = ({
  board,
  cells,
  restartGame,
  setBoard,
  setCells,
  gameStatus: currentGameStatus,
}: FieldProps) => {
  const {
    setGameStatus,
    editMode: { editTool },
    game: { fieldSize },
  } = currentGameStatus;

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
    restartGame();
    setBoard(generateBoard(10));
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
    if (fieldSize >= maxFieldSize) {
      return;
    }

    setGameStatus((gameStatus) => ({
      ...gameStatus,
      game: { ...gameStatus.game, fieldSize: fieldSize + 1 },
    }));

    let newBoard: Board = new Map();

    board.forEach((cell, position) => {
      newBoard.set(position, cell);

      if (fieldSize - columnOf(position) === 1) {
        newBoard.set(positionOf(rowOf(position), fieldSize), "blank");
      }
    });

    new Array(fieldSize + 1).fill("").forEach((_, index) => {
      newBoard.set(positionOf(fieldSize, index), "blank");
    });

    setBoard(newBoard);
  };

  const decreaseSize = () => {
    if (fieldSize <= minFieldSize) {
      return;
    }

    setGameStatus((gameStatus) => ({
      ...gameStatus,
      game: { ...gameStatus.game, fieldSize: fieldSize - 1 },
    }));

    let newBoard: Board = new Map();

    board.forEach((cell, position) => {
      newBoard.set(position, cell);

      if (fieldSize - 1 === columnOf(position)) {
        newBoard.delete(position);
      }
    });

    new Array(fieldSize).fill("").forEach((_, index) => {
      newBoard.delete(positionOf(fieldSize - 1, index));
    });

    setBoard(newBoard);
  };

  return {
    switchEditTool,
    resetBoard,
    disableTools,
    increaseSize,
    decreaseSize,
  };
};

export default fieldEditorUtils;
