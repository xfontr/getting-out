import { render, screen } from "@testing-library/react";
import Cell from "./Cell";

describe("Given a Cell component", () => {
  describe("When instantiated with a cell type 'player'", () => {
    test("Then it should render a player cell", () => {
      render(<Cell cellType="player" position="0-0" />);

      const cellPlayer = screen.getByTestId("player");

      expect(cellPlayer).toBeInTheDocument();
    });
  });

  describe("When instantiated with a cell type 'obstacle'", () => {
    test("Then it should render a player cell", () => {
      render(<Cell cellType="obstacle" position="0-0" />);

      const cellPlayer = screen.getByTestId("obstacle");

      expect(cellPlayer).toBeInTheDocument();
    });
  });

  describe("When instantiated with a cell type 'blank'", () => {
    test("Then it should render a player cell", () => {
      render(<Cell cellType="blank" position="0-0" />);

      const cellPlayer = screen.getByTestId("blank");

      expect(cellPlayer).toBeInTheDocument();
    });
  });
});
