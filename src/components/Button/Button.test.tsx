import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Given a Button component", () => {
  describe("When instantiated with a text as a child", () => {
    test("Then it should show said text", () => {
      const buttonText = "Hello";
      render(<Button>{buttonText}</Button>);

      const button = screen.getByRole("button", { name: buttonText });

      expect(button).toBeInTheDocument();
    });
  });
});
