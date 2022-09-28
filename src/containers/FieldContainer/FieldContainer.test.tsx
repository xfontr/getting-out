import { render } from "@testing-library/react";
import FieldContainer, { FieldProps } from "./FieldContainer";
import Wrapper from "../../test-utils/mock/Wrapper";

const mockField = jest.fn() as ({
  board,
  cells,
  editTool,
  setGameStatus,
  restartGame,
  setBoard,
  setCells,
}: FieldProps) => JSX.Element;

describe("Given a FieldContainer function", () => {
  describe("When instantiated with another component as props", () => {
    test("Then it should return said component with props to manage the field", () => {
      render(<FieldContainer WrappedField={mockField} />, {
        wrapper: Wrapper,
      });

      expect(mockField).toHaveBeenCalled();

      const calledWith = (mockField as jest.Mock).mock.calls[0][0];

      expect(calledWith).toHaveProperty("board");
      expect(calledWith).toHaveProperty("cells");
      expect(calledWith).toHaveProperty("editTool");
      expect(calledWith).toHaveProperty("setGameStatus");
      expect(calledWith).toHaveProperty("restartGame");
      expect(calledWith).toHaveProperty("setBoard");
      expect(calledWith).toHaveProperty("setCells");
    });
  });
});
