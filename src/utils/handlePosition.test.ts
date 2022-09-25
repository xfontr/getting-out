import { Board, Position } from "../types/gameBoard";
import { checkLimits, checkObstacles } from "./handlePosition";

describe("Given a checkLimits function", () => {
  describe("When called with a row, a column and a board size", () => {
    describe("If the row is smaller than 0", () => {
      test("Then it should return true", () => {
        const row = -1;
        const column = 1;
        const size = 5;

        const result = checkLimits(row, column, size);

        expect(result).toBe(true);
      });
    });

    describe("If the column is smaller than 0", () => {
      test("Then it should return true", () => {
        const row = 1;
        const column = -1;
        const size = 5;

        const result = checkLimits(row, column, size);

        expect(result).toBe(true);
      });
    });

    describe("If the row is bigger than the board size", () => {
      test("Then it should return true", () => {
        const row = 6;
        const column = 1;
        const size = 5;

        const result = checkLimits(row, column, size);

        expect(result).toBe(true);
      });
    });

    describe("If the column is bigger than the board size", () => {
      test("Then it should return true", () => {
        const row = 1;
        const column = 6;
        const size = 5;

        const result = checkLimits(row, column, size);

        expect(result).toBe(true);
      });
    });

    describe("If the column and the row are smaller than the board size and bigger than 0", () => {
      test("Then it should return false", () => {
        const row = 1;
        const column = 1;
        const size = 5;

        const result = checkLimits(row, column, size);

        expect(result).toBe(false);
      });
    });
  });
});

describe("Given a checkObstacles function", () => {
  const mockBoard: Board = new Map([
    ["0-0", "blank"],
    ["0-1", "blank"],
    ["1-0", "obstacle"],
    ["1-1", "blank"],
  ]);

  describe("When called with a position and a board map", () => {
    describe("If the position collides with an obstacle in the board", () => {
      test("Then it should return true", () => {
        const position: Position = "1-0";

        const result = checkObstacles(position, mockBoard);

        expect(result).toBe(true);
      });
    });

    describe("If the position doesn't collide with an obstacle in the board", () => {
      test("Then it should return false", () => {
        const position: Position = "1-1";

        const result = checkObstacles(position, mockBoard);

        expect(result).toBe(false);
      });
    });
  });
});
