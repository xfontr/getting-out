import { Position } from "../../types/gameBoard";
import generateBoard from "../generateBoard/generateBoard";
import neighbourCells from "./neighbourCells";

describe("Given a neighbourCells function", () => {
  describe("When called with a position and a map of cells", () => {
    test("Then it should return all the cells surrounding the position", () => {
      const mockBoard = generateBoard(10);
      const position: Position = "1-1";

      const expectedResult = [
        "0-0",
        "0-1",
        "0-2",
        "1-0",
        "1-1",
        "1-2",
        "2-0",
        "2-1",
        "2-2",
      ];
      const result = neighbourCells(position, mockBoard);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
