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
  setBoard,
  restartGame,
  setCells,
  board,
  cells,
  gameStatus: {
    editMode: { editTool },
    game: { fieldSize: 10 },
    setGameStatus,
  } as IGameContext,
};

describe("Given a switchEditTool function returned by a fieldEditorUtils function", () => {
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

describe("Given a resetBoard function returned by a fieldEditorUtils function", () => {
  const { resetBoard } = fieldEditorUtils(props);

  describe("When called", () => {
    test("Then it should restart the cells map and restart the cell count", () => {
      resetBoard();

      expect(restartGame).toHaveBeenCalledWith(setBoard);
      expect(setCells).toHaveBeenCalledWith(cellsInitialState);
    });
  });
});

describe("Given a disableTools function returned by a fieldEditorUtils function", () => {
  describe("When called and the current edit tool is a limited cell that has not reached its max amount", () => {
    test("Then it should do nothing", () => {
      editTool = "exit";

      const { disableTools } = fieldEditorUtils({
        ...props,
        gameStatus: { ...props.gameStatus, editMode: { editTool } },
      });
      disableTools();

      expect(setGameStatus).not.toHaveBeenCalled();
    });
  });

  describe("When called and the current edit tool is a limited cell that has reached its max amount", () => {
    test("Then it should change the edit tool to 'blank'", () => {
      editTool = "player";

      const { disableTools } = fieldEditorUtils({
        ...props,
        gameStatus: { ...props.gameStatus, editMode: { editTool } },
      });
      disableTools();

      expect(setGameStatus).toHaveBeenCalled();
    });
  });
});

describe("Given a increaseSize function returned by a fieldEditorUtils function", () => {
  describe("When called with a board of size 10", () => {
    test("Then it should update the board size, increasing it", () => {
      const bigBoard = new Map(generateBoard(10));
      const { increaseSize } = fieldEditorUtils({ ...props, board: bigBoard });

      increaseSize();

      expect(setGameStatus).toHaveBeenCalled();
    });
    test("Then it should add an entire extra column and row to the field", () => {
      const bigBoard = new Map(generateBoard(10));
      const { increaseSize } = fieldEditorUtils({ ...props, board: bigBoard });

      increaseSize();

      expect(setBoard).toHaveBeenCalled();

      const calledWith: Board = (setBoard as jest.Mock).mock.calls[0][0];

      const newColumn = new Array(10)
        .fill("")
        .map((_, index) => calledWith.get(`${index}-10`));

      const newRow = new Array(10)
        .fill("")
        .map((_, index) => calledWith.get(`10-${index}`));

      expect(newColumn.includes(undefined)).toBe(false);
      expect(newRow.includes(undefined)).toBe(false);
    });
  });

  describe("When called with a board of size superior than than 22", () => {
    test("Then it should do nothing", () => {
      const size = 23;
      const bigBoard = new Map(generateBoard(size));
      const { increaseSize } = fieldEditorUtils({
        ...props,
        board: bigBoard,
        gameStatus: {
          ...props.gameStatus,
          game: { ...props.gameStatus.game, fieldSize: size },
        },
      });

      increaseSize();

      expect(setGameStatus).not.toHaveBeenCalled();
      expect(setBoard).not.toHaveBeenCalled();
    });
  });
});

describe("Given a decreaseSize function returned by a fieldEditorUtils function", () => {
  describe("When called with a board of size 11", () => {
    test("Then it should update the board size, decreasing it", () => {
      const bigBoard = new Map(generateBoard(11));
      const { decreaseSize } = fieldEditorUtils({
        ...props,
        board: bigBoard,
        gameStatus: {
          ...props.gameStatus,
          game: { ...props.gameStatus.game, fieldSize: 11 },
        },
      });

      decreaseSize();

      expect(setGameStatus).toHaveBeenCalled();
    });
    test("Then it should add an entire extra column and row to the field", () => {
      const bigBoard = new Map(generateBoard(11));
      const { decreaseSize } = fieldEditorUtils({
        ...props,
        board: bigBoard,
        gameStatus: {
          ...props.gameStatus,
          game: { ...props.gameStatus.game, fieldSize: 11 },
        },
      });

      decreaseSize();

      expect(setBoard).toHaveBeenCalled();

      const calledWith: Board = (setBoard as jest.Mock).mock.calls[0][0];

      const newColumn = new Array(11)
        .fill("")
        .map((_, index) => calledWith.get(`${index}-10`));

      const newRow = new Array(11)
        .fill("")
        .map((_, index) => calledWith.get(`10-${index}`));

      newColumn.forEach((cell) => expect(cell).toBeUndefined());
      newRow.forEach((cell) => expect(cell).toBeUndefined());
    });
  });

  describe("When called with a board of size inferior than 10", () => {
    test("Then it should do nothing", () => {
      const size = 9;
      const bigBoard = new Map(generateBoard(size));
      const { decreaseSize } = fieldEditorUtils({
        ...props,
        board: bigBoard,
        gameStatus: {
          ...props.gameStatus,
          game: { ...props.gameStatus.game, fieldSize: size },
        },
      });

      decreaseSize();

      expect(setGameStatus).not.toHaveBeenCalled();
      expect(setBoard).not.toHaveBeenCalled();
    });
  });
});
