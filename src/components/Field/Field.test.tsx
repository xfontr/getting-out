import { screen } from "@testing-library/react";
import { render } from "../../test-utils/customRender/customRender";
import generateBoard from "../../utils/generateBoard/generateBoard";
import Field from "./Field";

describe("Given a Field component", () => {
  describe("When instantiated with a map of 4 cells", () => {
    test("Then it should render all the cells", () => {
      const boardSize = 2;
      const board = generateBoard(boardSize);

      const expectedCells = 3;
      const expectedPlayerCells = 1;

      render(<Field initialBoard={board} />);

      const cells = screen.getAllByTestId("blank");
      const player = screen.getAllByTestId("player");

      expect(cells).toHaveLength(expectedCells);
      expect(player).toHaveLength(expectedPlayerCells);

      cells.forEach((cell) => expect(cell).toBeInTheDocument());
      expect(player[0]).toBeInTheDocument();
    });
  });
});
