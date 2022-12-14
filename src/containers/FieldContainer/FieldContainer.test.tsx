import { waitFor } from "@testing-library/react";
import { render } from "../../test-utils/customRender/customRender";
import FieldContainer, { FieldProps } from "./FieldContainer";

const mockSetInitialStatus = jest.fn();

jest.mock("../../utils/fieldPlayerUtils/fieldPlayerUtils", () => ({
  ...jest.requireActual("../../utils/fieldPlayerUtils/fieldPlayerUtils"),
  setInitialStatus: () => mockSetInitialStatus(),
}));

const mockField = jest.fn() as ({
  board,
  cells,
  restartGame,
  setBoard,
  setCells,
  gameStatus,
}: FieldProps) => JSX.Element;

describe("Given a FieldContainer function", () => {
  describe("When instantiated with another component as props", () => {
    test("Then it should return said component with props to manage the field", () => {
      render(<FieldContainer WrappedField={mockField} />);

      expect(mockField).toHaveBeenCalled();

      const calledWith = (mockField as jest.Mock).mock.calls[0][0];

      expect(calledWith).toHaveProperty("board");
      expect(calledWith).toHaveProperty("cells");
      expect(calledWith).toHaveProperty("restartGame");
      expect(calledWith).toHaveProperty("setBoard");
      expect(calledWith).toHaveProperty("setCells");
      expect(calledWith).toHaveProperty("gameStatus");
    });

    test("Then it should call the board initial state setter", async () => {
      render(<FieldContainer WrappedField={mockField} initialBoard="new" />);

      await waitFor(() => {
        expect(mockSetInitialStatus).toHaveBeenCalled();
      });
    });
  });
});
