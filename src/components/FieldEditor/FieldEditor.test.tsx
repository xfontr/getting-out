import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FieldProps } from "../../containers/FieldContainer/FieldContainer";
import { IGameContext } from "../../Store/CallStatusContext/GameContext";
import Wrapper from "../../test-utils/mock/Wrapper";
import { Board, CellTypes } from "../../types/gameBoard";
import generateBoard from "../../utils/generateBoard/generateBoard";
import { readBoard } from "../../utils/readBoard/readBoard";
import FieldEditor from "./FieldEditor";

const board = new Map(generateBoard(5));
const cells = readBoard(board);
const setGameStatus = jest.fn() as React.Dispatch<
  React.SetStateAction<IGameContext>
>;
const setBoard = jest.fn() as React.Dispatch<React.SetStateAction<Board>>;
const restartGame = jest.fn() as (
  setGameBoard: React.Dispatch<React.SetStateAction<Board>>
) => void;
const setCells = jest.fn() as (
  value: React.SetStateAction<Record<CellTypes, number>>
) => void;
let editTool: CellTypes = "obstacle";

const props: FieldProps = {
  setGameStatus,
  setBoard,
  restartGame,
  setCells,
  board,
  cells,
  editTool,
  fieldSize: 10,
};

describe("Given a FieldEditor component", () => {
  describe("When instantiated with Field props", () => {
    test("Then it should render all the tools for editing the cells map", () => {
      render(<FieldEditor {...props} />, { wrapper: Wrapper });

      const fieldEditor = [
        screen.getByText(`Current tool: ${editTool}`),
        screen.getByRole("button", { name: "Reset board" }),
        screen.getByTestId("field"),
      ];

      Object.entries(cells).forEach(([type, amount]) =>
        fieldEditor.push(screen.getByText(`${type}: ${amount}`))
      );

      const editTools = screen.getByRole("button", { name: "Blank" });
      fieldEditor.push(editTools);

      fieldEditor.forEach((node) => expect(node).toBeInTheDocument());
    });
  });

  describe("When instantiated and clicked on the field", () => {
    test("Then it should update the cell count", async () => {
      render(<FieldEditor {...props} />, { wrapper: Wrapper });

      const field = screen.getByTestId("field");

      await userEvent.click(field);

      expect(setCells).toHaveBeenCalledWith(readBoard(board));
    });
  });
});
