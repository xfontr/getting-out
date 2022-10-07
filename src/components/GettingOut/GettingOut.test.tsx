import { screen } from "@testing-library/react";
import boards from "../../data/boards";
import { render } from "../../test-utils/customRender/customRender";
import mockGameContext from "../../test-utils/mock/mockContextProvider";
import { UserBoard } from "../../types/UserBoard";
import generateBoard from "../../utils/generateBoard/generateBoard";
import GettingOut from "./GettingOut";

boards.push({ board: generateBoard(10) } as UserBoard);

describe("Given a GettingOut component", () => {
  describe("When instantiated and the game status is 'edit'", () => {
    test("Then it should render the field editor tools and field", () => {
      render(<GettingOut />);

      const fieldEditor = screen.getByRole("button", {
        name: "Play",
      });

      expect(fieldEditor).toBeInTheDocument();
    });
  });

  describe("When instantiated and the game status is 'play'", () => {
    test("Then it should render the play field", () => {
      mockGameContext.status = "play";
      render(<GettingOut />);

      const playScreen = screen.getByText(
        `Score: ${mockGameContext.game.score}`
      );

      expect(playScreen).toBeInTheDocument();
    });
  });

  describe("When instantiated and the game status is 'fail'", () => {
    test("Then it should render the fail screen", () => {
      mockGameContext.status = "fail";
      render(<GettingOut />);

      const failScreen = screen.getByRole("heading", { name: "You lost" });

      expect(failScreen).toBeInTheDocument();
    });
  });

  describe("When instantiated and the game status is 'win'", () => {
    test("Then it should render the win screen", () => {
      mockGameContext.status = "win";
      render(<GettingOut />);

      const winScreen = screen.getByRole("heading", { name: "You won" });

      expect(winScreen).toBeInTheDocument();
    });
  });
});
