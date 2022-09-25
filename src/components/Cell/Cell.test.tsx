import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  GameContext,
  IGameContext,
} from "../../Store/CallStatusContext/GameContext";
import { Board, CellTypes } from "../../types/gameBoard";
import Cell from "./Cell";

describe("Given a Cell component", () => {
  const editTool: CellTypes = "obstacle";
  const isEditMode: boolean = true;
  const setGameStatus = jest.fn() as React.Dispatch<
    React.SetStateAction<IGameContext>
  >;

  const setBoard = jest.fn() as React.Dispatch<React.SetStateAction<Board>>;
  const mockContextProvider: IGameContext = {
    isEditMode,
    editTool,
    setGameStatus,
  };
  describe("When instantiated with a cell type 'player'", () => {
    test("Then it should render a player cell", () => {
      render(
        <GameContext.Provider value={mockContextProvider}>
          <Cell cellType="player" position="0-0" setBoard={setBoard} />
        </GameContext.Provider>
      );

      const cellPlayer = screen.getByTestId("player");

      expect(cellPlayer).toBeInTheDocument();
    });
  });

  describe("When instantiated with a cell type 'obstacle'", () => {
    test("Then it should render a obstacle cell", () => {
      render(
        <GameContext.Provider value={mockContextProvider}>
          <Cell cellType="obstacle" position="0-0" setBoard={setBoard} />
        </GameContext.Provider>
      );

      const cellPlayer = screen.getByTestId("obstacle");

      expect(cellPlayer).toBeInTheDocument();
    });
  });

  describe("When instantiated with a cell type 'blank'", () => {
    test("Then it should render a blank cell", () => {
      render(
        <GameContext.Provider value={mockContextProvider}>
          <Cell cellType="blank" position="0-0" setBoard={setBoard} />
        </GameContext.Provider>
      );

      const cellPlayer = screen.getByTestId("blank");

      expect(cellPlayer).toBeInTheDocument();
    });
  });

  describe("When instantiated as any type of cell with edit mode with obstacles", () => {
    test("Then it should convert the cell type to obstacle, on click", async () => {
      render(
        <GameContext.Provider value={mockContextProvider}>
          <Cell cellType="blank" position="0-0" setBoard={setBoard} />
        </GameContext.Provider>
      );

      const cellPlayer = screen.getByTestId("blank");
      await userEvent.click(cellPlayer);

      expect(cellPlayer.className.includes(editTool)).toBe(true);
      expect(cellPlayer.className.includes("blank")).toBe(false);

      expect(setBoard).toHaveBeenCalled();
    });
  });

  describe("When instantiated as any type of cell with edit mode with blank cells", () => {
    test("Then it should convert the cell type to blank, on click", async () => {
      render(
        <GameContext.Provider
          value={{ ...mockContextProvider, editTool: "blank" }}
        >
          <Cell cellType="obstacle" position="1-0" setBoard={setBoard} />
        </GameContext.Provider>
      );

      const cellPlayer = screen.getByTestId("obstacle");
      await userEvent.click(cellPlayer);

      expect(cellPlayer.className.includes("blank")).toBe(true);
      expect(cellPlayer.className.includes("obstacle")).toBe(false);
    });
  });

  describe("When instantiated as any type of cell with edit mode off", () => {
    test("Then it should not change the cell type on click", async () => {
      render(
        <GameContext.Provider
          value={{ ...mockContextProvider, isEditMode: false }}
        >
          <Cell cellType="blank" position="0-1" setBoard={setBoard} />
        </GameContext.Provider>
      );

      const cellPlayer = screen.getByTestId("blank");
      await userEvent.click(cellPlayer);

      expect(cellPlayer.className.includes(editTool)).toBe(false);
      expect(cellPlayer.className.includes("blank")).toBe(true);

      expect(setBoard).not.toHaveBeenCalled();
    });
  });
});
