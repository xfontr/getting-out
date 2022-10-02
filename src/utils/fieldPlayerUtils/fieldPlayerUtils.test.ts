import boards from "../../data/boards";
import { IGameContext } from "../../Store/CallStatusContext/GameContext";
import generateBoard from "../generateBoard/generateBoard";
import { setInitialBoard, setInitialStatus } from "./fieldPlayerUtils";

describe("Given a setInitialBoard function", () => {
  describe("When called with a board id", () => {
    test("Then it should return the cell map corresponding to that board", () => {
      const board = generateBoard(10);
      boards.push({ board });

      const boardId = 0;

      const result = setInitialBoard(boardId);

      expect(result).toStrictEqual(boards[boardId].board);
    });
  });

  describe("When called with a non-existant board id", () => {
    test("Then it shouild return a new empty board", () => {
      const board = generateBoard(10);

      const boardId = 99;

      const result = setInitialBoard(boardId);

      expect(result).toStrictEqual(board);
    });
  });

  describe("When called with 'new'", () => {
    test("Then it shouild return a new empty board", () => {
      const board = generateBoard(10);

      const requestNew = "new";

      const result = setInitialBoard(requestNew);

      expect(result).toStrictEqual(board);
    });
  });
});

describe("Given a setInitialStatus function", () => {
  const setStatus = jest.fn() as React.Dispatch<
    React.SetStateAction<IGameContext>
  >;
  describe("When called with a game context status setter and a board id", () => {
    test("Then it should call the setter with the game data", () => {
      const board = generateBoard(10);
      boards.push({ board });

      const boardId = 0;

      setInitialStatus(setStatus, boardId);

      expect(setStatus).toHaveBeenCalled();
    });
  });

  describe("When called with a game context status setter and a board id that doesn't exist", () => {
    test("Then it should do nothing", () => {
      const boardId = 99;

      setInitialStatus(setStatus, boardId);

      expect(setStatus).not.toHaveBeenCalled();
    });
  });

  describe("When called with a game context status setter and 'new'", () => {
    test("Then it should do nothing", () => {
      const boardId = 99;

      setInitialStatus(setStatus, boardId);

      expect(setStatus).not.toHaveBeenCalled();
    });
  });
});
