import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SyntheticEvent } from "react";
import { render } from "../../test-utils/customRender/customRender";
import { CellTypes } from "../../types/gameBoard";
import generateBoard from "../../utils/generateBoard/generateBoard";
import { readBoard } from "../../utils/readBoard/readBoard";
import EditTools from "./EditTools";

const board = new Map(generateBoard(5));
const cells = readBoard(board);
const switchEditTool = jest.fn() as (event: SyntheticEvent) => void;
let editTool: CellTypes = "obstacle";

const props = {
  switchEditTool,
  cells,
  editTool,
};

describe("Given a EditTools component", () => {
  describe("When instantiated with a group of cells, a type of edit tool and a function to switch the tool", () => {
    test("Then it should show a button for each type of cell", () => {
      render(<EditTools {...props} />);

      const editTools = Object.keys(cells).map((cell) =>
        screen.getByRole("button", {
          name: `${cell.charAt(0).toUpperCase()}${cell.slice(1)}`,
        })
      );

      editTools.forEach((tool) => expect(tool).toBeInTheDocument());
    });

    describe("And clicking a button with a 'limited' cell", () => {
      test("Then it should update the edit tool to said cell", async () => {
        editTool = "exit";

        render(<EditTools {...{ ...props, editTool }} />);

        const exitCell = screen.getByRole("button", { name: "Exit" });

        await userEvent.click(exitCell);

        expect(switchEditTool).toHaveBeenCalled();
      });

      test("Then it should not update the edit tool if the cell is at its limit", async () => {
        editTool = "player";

        render(<EditTools {...{ ...props, editTool }} />);

        const playerCell = screen.getByRole("button", { name: "Player" });

        await userEvent.click(playerCell);

        expect(switchEditTool).not.toHaveBeenCalled();
      });
    });
  });
});
