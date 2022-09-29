import initialToCaps from "./initialToCaps";

describe("Given a initialToCaps function", () => {
  describe("When called with a string", () => {
    test("Then it should return the same string but with the first letter being capitalized", () => {
      const wordToConvert = "hello";
      const expectedWord = "Hello";

      const result = initialToCaps(wordToConvert);

      expect(result).toBe(expectedWord);
    });
  });
});
