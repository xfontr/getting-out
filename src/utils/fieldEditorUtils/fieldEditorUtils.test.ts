import { SyntheticEvent } from "react";
import {
  cellsInitialState,
  FieldProps,
} from "../../containers/FieldContainer/FieldContainer";
import { IGameContext } from "../../Store/CallStatusContext/GameContext";
import { Board, CellTypes } from "../../types/gameBoard";
import generateBoard from "../generateBoard/generateBoard";
import { readBoard } from "../readBoard/readBoard";
import fieldEditorUtils from "./fieldEditorUtils";

const board = new Map(generateBoard(5));
const cells = readBoard(board);
const setGameStatus = jest.fn() as React.Dispatch<
  React.SetStateAction<IGameContext>
>;
const setBoard = jest.fn() as React.Dispatch<React.SetStateAction<Board>>;
const restartGame = jest.fn() as (
  setGameBoard: React.Dispatch<React.SetStateAction<Board>>
) => void;
const setCells = jest.fn() as (
  value: React.SetStateAction<Record<CellTypes, number>>
) => void;
let editTool: CellTypes = "obstacle";

const props: FieldProps = {
  setGameStatus,
  setBoard,
  restartGame,
  setCells,
  board,
  cells,
  editTool,
  fieldSize: 10,
};

describe("Given a switchEditTool returned by a fieldEditorUtils function", () => {
  const { switchEditTool } = fieldEditorUtils(props);

  describe("When called with a button even which id is a cell type 'blank'", () => {
    test("Then it should update the cell count and change the edit tool to 'blank'", () => {
      const event = {
        currentTarget: {
          id: "blank",
        },
      } as Partial<SyntheticEvent>;

      switchEditTool(event as SyntheticEvent);

      expect(setCells).toHaveBeenCalledWith(readBoard(board));
      expect(setGameStatus).toHaveBeenCalled();
    });
  });

  describe("When called with a button even which id is a cell type 'player'", () => {
    test("Then it should not update the cell count neither change the tool", () => {
      const event = {
        currentTarget: {
          id: "player",
        },
      } as Partial<SyntheticEvent>;

      switchEditTool(event as SyntheticEvent);

      expect(setCells).not.toHaveBeenCalled();
      expect(setGameStatus).not.toHaveBeenCalled();
    });
  });
});

describe("Given a resetBoard returned by a fieldEditorUtils function", () => {
  const { resetBoard } = fieldEditorUtils(props);

  describe("When called", () => {
    test("Then it should restart the cells map and restart the cell count", () => {
      resetBoard();

      expect(restartGame).toHaveBeenCalledWith(setBoard);
      expect(setCells).toHaveBeenCalledWith(cellsInitialState);
    });
  });
});

describe("Given a disableTools returned by a fieldEditorUtils function", () => {
  describe("When called and the current edit tool is a limited cell that has not reached its max amount", () => {
    test("Then it should do nothing", () => {
      editTool = "exit";

      const { disableTools } = fieldEditorUtils({ ...props, editTool });
      disableTools();

      expect(setGameStatus).not.toHaveBeenCalled();
    });
  });

  describe("When called and the current edit tool is a limited cell that has reached its max amount", () => {
    test("Then it should change the edit tool to 'blank'", () => {
      editTool = "player";

      const { disableTools } = fieldEditorUtils({ ...props, editTool });
      disableTools();

      expect(setGameStatus).toHaveBeenCalled();
    });
  });
});
