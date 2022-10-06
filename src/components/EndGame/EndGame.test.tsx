import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import boards from "../../data/boards";
import { render } from "../../test-utils/customRender/customRender";
import mockGameContext from "../../test-utils/mock/mockContextProvider";
import { UserBoard } from "../../types/UserBoard";
import generateBoard from "../../utils/generateBoard/generateBoard";
import EndGame from "./EndGame";

const mockRestartGame = jest.fn();
const mockStartGame = jest.fn();
const mockEditMode = jest.fn();

jest.mock("../../hooks/usePlaying/usePlaying", () => () => ({
  restartGame: () => mockRestartGame(),
  startGame: () => mockStartGame(),
  editMode: () => mockEditMode(),
}));

describe("Given an EndGame component", () => {
  boards.push({ board: generateBoard(10), fieldSize: 10 } as UserBoard);

  describe("When instantiated", () => {
    test("Then it should display the played board and buttons to play again and to go back to edit mode", () => {
      render(<EndGame gameStatus={{ ...mockGameContext, status: "fail" }} />);

      const endGameView = [
        screen.getByRole("button", { name: "Play again" }),
        screen.getByRole("button", { name: "Edit mode" }),
        screen.getByTestId("field"),
      ];

      endGameView.forEach((element) => expect(element).toBeInTheDocument());
    });

    describe("And clicked the play button", () => {
      test("Then it should restart the game status and start the game again", async () => {
        render(<EndGame gameStatus={{ ...mockGameContext, status: "fail" }} />);

        const playButton = screen.getByRole("button", { name: "Play again" });

        await userEvent.click(playButton);

        expect(mockRestartGame).toHaveBeenCalled();
        expect(mockStartGame).toHaveBeenCalled();
      });
    });

    describe("And clicked the edit mode button", () => {
      test("Then it should restart the game status and start the edit mode again", async () => {
        render(<EndGame gameStatus={{ ...mockGameContext, status: "fail" }} />);

        const playButton = screen.getByRole("button", { name: "Edit mode" });

        await userEvent.click(playButton);

        expect(mockRestartGame).toHaveBeenCalled();
        expect(mockEditMode).toHaveBeenCalled();
      });
    });
  });

  describe("When instantiated with a failed game", () => {
    test("Then it should display a 'You lost message'", () => {
      render(<EndGame gameStatus={{ ...mockGameContext, status: "fail" }} />);

      const failMessage = screen.getByRole("heading", { name: "You lost" });

      expect(failMessage).toBeInTheDocument();
    });
  });

  describe("When instantiated with a won game", () => {
    test("Then it should display a 'You won' message and all the winning details", () => {
      render(<EndGame gameStatus={{ ...mockGameContext, status: "win" }} />);

      const winView = [
        screen.getByRole("heading", { name: "You won" }),
        screen.getByText(
          `You had ${mockGameContext.game.timeLeft} seconds left and your total score is ${mockGameContext.game.score}. Good job!`
        ),
      ];

      winView.forEach((element) => expect(element).toBeInTheDocument());
    });
  });
});
