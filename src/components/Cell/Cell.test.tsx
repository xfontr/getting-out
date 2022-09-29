import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  GameContext,
  IGameContext,
} from "../../Store/CallStatusContext/GameContext";
import { render } from "../../test-utils/customRender/customRender";
import { Board, CellTypes, Position } from "../../types/gameBoard";
import generateBoard from "../../utils/generateBoard/generateBoard";
import Cell from "./Cell";

describe("Given a Cell component", () => {
  const editTool: CellTypes = "obstacle";
  const setGameStatus = jest.fn() as React.Dispatch<
    React.SetStateAction<IGameContext>
  >;

  const setBoard = jest.fn() as React.Dispatch<React.SetStateAction<Board>>;
  const mockContextProvider: IGameContext = {
    isEditMode: true,
    isPlaying: false,
    editMode: {
      editTool,
    },
    game: {
      fieldSize: 10,
      exits: 1,
      timeLeft: 0,
      score: 0,
      shootsLeft: 3,
    },
    setGameStatus,
  };
  const player: Position = "1-1";
  const board = generateBoard(10);

  describe("When instantiated with a cell type 'player'", () => {
    test("Then it should render a player cell", () => {
      render(
        <GameContext.Provider value={mockContextProvider}>
          <Cell
            cellType="player"
            position="0-0"
            setBoard={setBoard}
            player={player}
            board={board}
          />
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
          <Cell
            cellType="obstacle"
            position="0-0"
            setBoard={setBoard}
            player={player}
            board={board}
          />
        </GameContext.Provider>
      );

      const cellObstacle = screen.getByTestId("obstacle");

      expect(cellObstacle).toBeInTheDocument();
    });
  });

  describe("When instantiated with a cell type 'blank'", () => {
    test("Then it should render a blank cell", () => {
      render(
        <GameContext.Provider value={mockContextProvider}>
          <Cell
            cellType="blank"
            position="0-0"
            setBoard={setBoard}
            player={player}
            board={board}
          />
        </GameContext.Provider>
      );

      const cellBlank = screen.getByTestId("blank");

      expect(cellBlank).toBeInTheDocument();
    });
  });

  describe("When instantiated as any type of cell with edit mode with obstacles", () => {
    test("Then it should convert the cell type to obstacle, on click", async () => {
      render(
        <GameContext.Provider value={mockContextProvider}>
          <Cell
            cellType="blank"
            position="0-0"
            setBoard={setBoard}
            player={player}
            board={board}
          />
        </GameContext.Provider>
      );

      const cellBlank = screen.getByTestId("blank");
      await userEvent.click(cellBlank);

      expect(cellBlank.className.includes(editTool)).toBe(true);
      expect(cellBlank.className.includes("blank")).toBe(false);

      expect(setBoard).toHaveBeenCalled();
    });
  });

  describe("When instantiated as any type of cell with edit mode with blank cells", () => {
    test("Then it should convert the cell type to blank, on click", async () => {
      render(
        <GameContext.Provider
          value={{
            ...mockContextProvider,
            editMode: { ...mockContextProvider.editMode, editTool: "blank" },
          }}
        >
          <Cell
            cellType="obstacle"
            position="1-0"
            setBoard={setBoard}
            player={player}
            board={board}
          />
        </GameContext.Provider>
      );

      const cellObstacle = screen.getByTestId("obstacle");
      await userEvent.click(cellObstacle);

      expect(cellObstacle.className.includes("blank")).toBe(true);
      expect(cellObstacle.className.includes("obstacle")).toBe(false);
    });
  });

  describe("When instantiated as any type of cell with edit mode off", () => {
    test("Then it should not change the cell type on click", async () => {
      render(
        <GameContext.Provider
          value={{ ...mockContextProvider, isEditMode: false }}
        >
          <Cell
            cellType="blank"
            position="0-1"
            setBoard={setBoard}
            player={player}
            board={board}
          />
        </GameContext.Provider>
      );

      const cell = screen.getByTestId("blank");
      await userEvent.click(cell);

      expect(cell.className.includes(editTool)).toBe(false);
      expect(cell.className.includes("blank")).toBe(true);

      expect(setBoard).not.toHaveBeenCalled();
    });
  });

  describe("When instantiated as an obstacle with edit mode off and double clicked", () => {
    test("Then it should be converted to 'blank' if it's a neighbour of the player", async () => {
      render(
        <GameContext.Provider
          value={{ ...mockContextProvider, isEditMode: false }}
        >
          <Cell
            cellType="obstacle"
            position="0-1"
            setBoard={setBoard}
            player={"1-1"}
            board={board}
          />
        </GameContext.Provider>
      );

      const cellObstacle = screen.getByTestId("obstacle");
      await userEvent.dblClick(cellObstacle);

      expect(cellObstacle.className.includes("blank")).toBe(true);
      expect(cellObstacle.className.includes("obstacle")).toBe(false);

      expect(setBoard).toHaveBeenCalled();
    });

    test("Then it should do nothing if it's not a neighbour of the player", async () => {
      render(
        <GameContext.Provider
          value={{ ...mockContextProvider, isEditMode: false }}
        >
          <Cell
            cellType="obstacle"
            position="4-4"
            setBoard={setBoard}
            player={"1-1"}
            board={board}
          />
        </GameContext.Provider>
      );

      const cellObstacle = screen.getByTestId("obstacle");
      await userEvent.dblClick(cellObstacle);

      expect(cellObstacle.className.includes("blank")).toBe(false);
      expect(cellObstacle.className.includes("obstacle")).toBe(true);

      expect(setBoard).not.toHaveBeenCalled();
    });

    test("Then it should do nothing if it's the same position as the player's", async () => {
      render(
        <GameContext.Provider
          value={{ ...mockContextProvider, isEditMode: false }}
        >
          <Cell
            cellType="player"
            position="1-1"
            setBoard={setBoard}
            player={"1-1"}
            board={board}
          />
        </GameContext.Provider>
      );

      const cellPlayer = screen.getByTestId("player");
      await userEvent.dblClick(cellPlayer);

      expect(cellPlayer.className.includes("player")).toBe(true);

      expect(setBoard).not.toHaveBeenCalled();
    });

    test("Then it should do nothing if the player has no shoots left", async () => {
      render(
        <GameContext.Provider
          value={{
            ...mockContextProvider,
            isEditMode: false,
            game: { ...mockContextProvider.game, shootsLeft: 0 },
          }}
        >
          <Cell
            cellType="obstacle"
            position="0-1"
            setBoard={setBoard}
            player={"1-1"}
            board={board}
          />
        </GameContext.Provider>
      );

      const cellObstacle = screen.getByTestId("obstacle");
      await userEvent.dblClick(cellObstacle);

      expect(cellObstacle.className.includes("blank")).toBe(false);
      expect(cellObstacle.className.includes("obstacle")).toBe(true);

      expect(setBoard).not.toHaveBeenCalled();
    });
  });

  describe("When instantiated as an obstacle with edit mode on and double clicked", () => {
    test("Then it should be converted to 'blank'", async () => {
      render(
        <GameContext.Provider
          value={{ ...mockContextProvider, isEditMode: true }}
        >
          <Cell
            cellType="obstacle"
            position="4-4"
            setBoard={setBoard}
            player={"1-1"}
            board={board}
          />
        </GameContext.Provider>
      );

      const cellObstacle = screen.getByTestId("obstacle");
      await userEvent.dblClick(cellObstacle);

      expect(cellObstacle.className.includes("blank")).toBe(true);
      expect(cellObstacle.className.includes("obstacle")).toBe(false);

      expect(setBoard).toHaveBeenCalled();
    });

    test("Then the user should be able to shoot as many cells as wanted", async () => {
      const cells = new Array(4).fill(null);

      render(
        <GameContext.Provider
          value={{ ...mockContextProvider, isEditMode: true }}
        >
          {cells.map((cell, index) => (
            <Cell
              cellType="obstacle"
              position={`4-${index}`}
              setBoard={setBoard}
              player={"1-1"}
              board={board}
            />
          ))}
        </GameContext.Provider>
      );

      const cellObstacles = screen.getAllByTestId("obstacle");

      await userEvent.dblClick(cellObstacles[0]);
      await userEvent.dblClick(cellObstacles[1]);
      await userEvent.dblClick(cellObstacles[2]);
      await userEvent.dblClick(cellObstacles[3]);

      cellObstacles.forEach((cellObstacle) => {
        expect(cellObstacle.className.includes("blank")).toBe(true);
        expect(cellObstacle.className.includes("obstacle")).toBe(false);
      });

      expect(setBoard).toHaveBeenCalledTimes(12);
    });
  });
});
