import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FieldProps } from "../../containers/FieldContainer/FieldContainer";
import boards from "../../data/boards";
import { IGameContext } from "../../Store/CallStatusContext/GameContext";
import { render } from "../../test-utils/customRender/customRender";
import { Board, CellTypes } from "../../types/gameBoard";
import UserBoard from "../../types/UserBoard";
import generateBoard from "../../utils/generateBoard/generateBoard";
import initialToCaps from "../../utils/initialToCaps/initialToCaps";
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
const fieldSize = 10;

const props: FieldProps = {
  setGameStatus,
  setBoard,
  restartGame,
  setCells,
  board,
  cells,
  editTool,
  fieldSize,
};

describe("Given a FieldEditor component", () => {
  describe("When instantiated with Field props", () => {
    test("Then it should render all the tools for editing the cells map", () => {
      render(<FieldEditor {...props} />);

      const fieldEditor = [
        screen.getByText(`Selected tool: ${initialToCaps(editTool)}`),
        screen.getByText(`Field size: ${fieldSize}`),
        screen.getByRole("button", { name: "Reset board" }),
        screen.getByTestId("field"),
        screen.getByLabelText("Shoots"),
        screen.getByLabelText("Time limit"),
        screen.getByRole("button", { name: "Submit" }),
        screen.getByRole("button", { name: "Increase size" }),
        screen.getByRole("button", { name: "Decrease size" }),
      ];

      Object.entries(cells).forEach(([type, amount]) =>
        fieldEditor.push(screen.getByText(`${initialToCaps(type)}: ${amount}`))
      );

      const editTools = screen.getByRole("button", { name: "Blank" });
      fieldEditor.push(editTools);

      fieldEditor.forEach((node) => expect(node).toBeInTheDocument());
    });
  });

  describe("When instantiated and clicked on the field", () => {
    test("Then it should update the cell count", async () => {
      render(<FieldEditor {...props} />);

      const field = screen.getByTestId("field");

      await userEvent.click(field);

      expect(setCells).toHaveBeenCalledWith(readBoard(board));
    });
  });

  describe("When instantiated and clicked the submit button", () => {
    test("Then it should send the board data with the field values to the global list of boards", async () => {
      const expectedBoardData: UserBoard = {
        board,
        exits: 0,
        shoots: 3,
        timeLeft: 10,
      };

      render(<FieldEditor {...props} />);

      const submitButton = screen.getByRole("button", { name: "Submit" });

      await userEvent.click(submitButton);

      expect(boards[0]).toStrictEqual(expectedBoardData);
    });
  });
});
