import generateBoard from "./generateBoard";

describe("Given a generateBoard function", () => {
  describe("When called with a size of 2", () => {
    test("Then it should return a map of size 4", () => {
      const size = 2;
      const expectedSize = 4;

      const result = generateBoard(size);

      expect(result.size).toBe(expectedSize);
    });

    test("Then it should return a map with three blank positions and a player", () => {
      const size = 2;
      const expectedResult = new Map([
        ["0-0", "blank"],
        ["0-1", "blank"],
        ["1-0", "blank"],
        ["1-1", "player"],
      ]);

      const result = generateBoard(size);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
