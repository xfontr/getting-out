import { screen } from "@testing-library/react";
import { render } from "../../test-utils/customRender/customRender";
import mockGameContext from "../../test-utils/mock/mockContextProvider";
import EndGame from "./EndGame";

describe("Given an EndGame component", () => {
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
          `You had ${mockGameContext.game.timeLeft} seconds left and your total score is ${mockGameContext.game.score}`
        ),
      ];

      winView.forEach((element) => expect(element).toBeInTheDocument());
    });
  });
});
