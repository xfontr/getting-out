import { SyntheticEvent } from "react";
import Field from "../Field/Field";
import { CellTypes } from "../../types/gameBoard";
import { checkIfBoardMaximum, readBoard } from "../../utils/readBoard";

import EditTools from "../EditTools/EditTools";
import limitedCells from "../../data/limitedCells";
import {
  cellsInitialState,
  FieldProps,
} from "../../containers/FieldContainer/FieldContainer";

const FieldEditor = ({
  board,
  cells,
  editTool,
  setGameStatus,
  restartGame,
  setBoard,
  setCells,
}: FieldProps): JSX.Element => {
  const resetBoard = (): void => {
    restartGame(setBoard);
    setCells(cellsInitialState);
  };

  const switchEditTool = (event: SyntheticEvent): void => {
    const requestedCell = event.currentTarget.id as CellTypes;

    if (checkIfBoardMaximum(requestedCell, board)) {
      return;
    }

    setCells(readBoard(board));
    setGameStatus((gameStatus) => ({
      ...gameStatus,
      editMode: { ...gameStatus, editTool: requestedCell },
    }));
  };

  const disableTools = (): void => {
    if (
      limitedCells
        .map((cell) => cells[cell] === 0 && editTool === cell)
        .includes(true)
    ) {
      setGameStatus((gameStatus) => ({
        ...gameStatus,
        editMode: { ...gameStatus, editTool: "blank" },
      }));
    }
  };

  return (
    <>
      <p>Current tool: {editTool}</p>

      <ul>
        {Object.entries(cells).map(([type, amount]) => (
          <li key={type}>
            {type}: {amount}
          </li>
        ))}
      </ul>

      <EditTools
        cells={cells}
        editTool={editTool}
        switchEditTool={switchEditTool}
      />
      <button onClick={resetBoard}>Reset board</button>
      <button onClick={() => {}}>Submit</button>

      <Field
        onClick={() => {
          setCells(readBoard(board));
          disableTools();
        }}
        initialBoard={board}
      />
    </>
  );
};

export default FieldEditor;
