import getScoreRatio from "./getScoreRatio";

describe("Given a getScoreRatio function", () => {
  describe("When called with a time of 10 (seconds)", () => {
    test("Then it should return a score ratio of 500", () => {
      const time = 10;

      const expectedRatio = 500;

      const result = getScoreRatio(time);

      expect(result).toBe(expectedRatio);
    });
  });
});
