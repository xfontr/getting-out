import { Board, Position } from "../types/gameBoard";
import {
  checkLimits,
  checkObstacles,
  getPosition,
  positionOf,
} from "./handlePosition";

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

describe("Given a getPosition function", () => {
  describe("When called with a position and a keyboard key of 'ArrowUp' or 'w'", () => {
    test("Then it should return an object with a row and a column that are one position up", () => {
      const position: Position = "1-1";
      const arrowKey = "ArrowUp";

      const expectedResult = {
        row: 0,
        column: 1,
      };
      const resultWithArrows = getPosition(position, arrowKey);

      expect(resultWithArrows).toStrictEqual(expectedResult);

      const key = "w";
      const resultWithLetters = getPosition(position, key);

      expect(resultWithLetters).toStrictEqual(expectedResult);
    });
  });

  describe("When called with a position and a keyboard key of 'ArrowRight' or 'd'", () => {
    test("Then it should return an object with a row and a column that are one position to the right", () => {
      const position: Position = "1-1";
      const arrowKey = "ArrowRight";

      const expectedResult = {
        row: 1,
        column: 2,
      };
      const resultWithArrows = getPosition(position, arrowKey);

      expect(resultWithArrows).toStrictEqual(expectedResult);

      const key = "d";
      const resultWithLetters = getPosition(position, key);

      expect(resultWithLetters).toStrictEqual(expectedResult);
    });
  });

  describe("When called with a position and a keyboard key of 'ArrowDown' or 's'", () => {
    test("Then it should return an object with a row and a column that are one position down", () => {
      const position: Position = "1-1";
      const arrowKey = "ArrowDown";

      const expectedResult = {
        row: 2,
        column: 1,
      };
      const resultWithArrows = getPosition(position, arrowKey);

      expect(resultWithArrows).toStrictEqual(expectedResult);

      const key = "s";
      const resultWithLetters = getPosition(position, key);

      expect(resultWithLetters).toStrictEqual(expectedResult);
    });
  });

  describe("When called with a position and a keyboard key of 'ArrowLeft' or 'a'", () => {
    test("Then it should return an object with a row and a column that are one position to the left", () => {
      const position: Position = "1-1";
      const arrowKey = "ArrowLeft";

      const expectedResult = {
        row: 1,
        column: 0,
      };
      const resultWithArrows = getPosition(position, arrowKey);

      expect(resultWithArrows).toStrictEqual(expectedResult);

      const key = "a";
      const resultWithLetters = getPosition(position, key);

      expect(resultWithLetters).toStrictEqual(expectedResult);
    });
  });
});

describe("Given a positionOf function", () => {
  describe("When called with a row '1' and a column '2'", () => {
    test("Then it should return a position '1-2'", () => {
      const row = 1;
      const column = 2;

      const expectedResult = "1-2";
      const result = positionOf(row, column);

      expect(result).toBe(expectedResult);
    });
  });
});
