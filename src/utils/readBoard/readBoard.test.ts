import limitedCells from "../../data/limitedCells";
import { CellTypes } from "../../types/gameBoard";
import generateBoard from "../generateBoard/generateBoard";
import { readBoard, checkIfBoardMaximum, getLastCellByType } from "./readBoard";

describe("Given a readBoard function", () => {
  describe("When called with a map of cells", () => {
    const mockBoard = new Map(generateBoard(5));
    mockBoard.set("3-3", "obstacle");
    mockBoard.set("4-4", "exit");
    test("Then it should return an object counting the amount of each cell", () => {
      const expectedResult = {
        player: 1,
        exit: 1,
        blank: 22,
        obstacle: 1,
      };

      const result = readBoard(mockBoard);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

describe("Given a checkIfBoardMaximum function", () => {
  describe("When called with a 'limited' cell type and a map of cells", () => {
    const limitedCell =
      limitedCells[Math.floor(Math.random() * limitedCells.length)];

    test("Then it should return true if the board already has that cell", () => {
      const mockBoard = new Map(generateBoard(5));
      mockBoard.set("1-1", "blank");
      mockBoard.set("3-3", limitedCell);

      const result = checkIfBoardMaximum(limitedCell, mockBoard);

      expect(result).toBe(true);
    });

    test("Then it should return false if the board doesn't include that cell", () => {
      const mockBoard = new Map(generateBoard(5));
      mockBoard.set("1-1", "blank");

      const result = checkIfBoardMaximum(limitedCell, mockBoard);

      expect(result).toBe(false);
    });

    describe("When called with a not 'limited' cell type and a map of cells", () => {
      test("Then it should return false", () => {
        const mockBoard = new Map(generateBoard(5));
        const notLimitedCell = "blank";

        const result = checkIfBoardMaximum(notLimitedCell, mockBoard);

        expect(result).toBe(false);
      });
    });
  });
});

describe("Given a getLastCellByType function", () => {
  describe("When called with a celltype 'player' and a board with one player", () => {
    test("Then it should return the position of the player", () => {
      const mockBoard = new Map(generateBoard(5));
      const cellType: CellTypes = "player";
      const expectedResult = "1-1";

      const result = getLastCellByType(cellType, mockBoard);

      expect(result).toBe(expectedResult);
    });
  });

  describe("When called with a celltype 'obstacle' and a board with zero obstacles", () => {
    test("Then it should return a 0-0 position", () => {
      const mockBoard = new Map(generateBoard(5));
      const cellType: CellTypes = "obstacle";
      const expectedResult = "0-0";

      const result = getLastCellByType(cellType, mockBoard);

      expect(result).toBe(expectedResult);
    });
  });
});
