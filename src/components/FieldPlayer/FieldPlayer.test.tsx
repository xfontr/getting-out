import { screen } from "@testing-library/react";
import { FieldProps } from "../../containers/FieldContainer/FieldContainer";
import { render } from "../../test-utils/customRender/customRender";
import mockContextProvider from "../../test-utils/mock/mockContextProvider";
import { Board, CellTypes } from "../../types/gameBoard";
import generateBoard from "../../utils/generateBoard/generateBoard";
import { readBoard } from "../../utils/readBoard/readBoard";
import FieldPlayer from "./FieldPlayer";

describe("Given a FieldPlayer component", () => {
  const board = new Map(generateBoard(5));
  const cells = readBoard(board);
  const setBoard = jest.fn() as React.Dispatch<React.SetStateAction<Board>>;
  const restartGame = jest.fn() as (
    setGameBoard: React.Dispatch<React.SetStateAction<Board>>
  ) => void;
  const setCells = jest.fn() as (
    value: React.SetStateAction<Record<CellTypes, number>>
  ) => void;

  const props: FieldProps = {
    setBoard,
    restartGame,
    setCells,
    board,
    cells,
    gameStatus: mockContextProvider,
  };

  describe("When instantiated with the field container props", () => {
    test("Then it should display a field, the shoots and the time left", () => {
      render(<FieldPlayer {...props} />);

      const fieldPlayer = [
        screen.getByText(
          `Shoots left: ${mockContextProvider.game.shootsLeft} (double click neighbour cell to shoot)`
        ),
        screen.getByText(`Time left: ${mockContextProvider.game.timeLeft}`),
        screen.getByTestId("field"),
      ];

      fieldPlayer.forEach((element) => expect(element).toBeInTheDocument());
    });
  });
});
