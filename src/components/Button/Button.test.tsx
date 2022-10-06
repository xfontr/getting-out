import { screen } from "@testing-library/react";
import { render } from "../../test-utils/customRender/customRender";
import Button, { OutlineButton, ToolButton } from "./Button";

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

describe("Given a OutlineButton component", () => {
  describe("When instantiated with a text as a child", () => {
    test("Then it should show said text", () => {
      const buttonText = "Hello";
      render(<OutlineButton>{buttonText}</OutlineButton>);

      const button = screen.getByRole("button", { name: buttonText });

      expect(button).toBeInTheDocument();
    });

    test("Then it should have a transparent background", () => {
      const buttonText = "Hello";
      render(<OutlineButton>{buttonText}</OutlineButton>);

      const button = screen.getByRole("button", { name: buttonText });

      expect(button).toHaveStyle("background-color: transparent");
    });
  });
});

describe("Given a ToolButton component", () => {
  describe("When instantiated with a text as a child", () => {
    test("Then it should show said text", () => {
      const buttonText = "Hello";
      render(<ToolButton>{buttonText}</ToolButton>);

      const button = screen.getByRole("button", { name: buttonText });

      expect(button).toBeInTheDocument();
    });

    test("If the button is active, it should show bold text and borders", () => {
      const buttonText = "Hello";
      render(<ToolButton isActive={true}>{buttonText}</ToolButton>);

      const button = screen.getByRole("button", { name: buttonText });

      expect(button).toHaveStyle("border-width: 2px; font-weight: bold");
    });
  });
});
