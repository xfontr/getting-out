import { ButtonHTMLAttributes, ReactNode } from "react";
import ButtonStyled from "./Button.styled";

interface ButtonProps<T> extends ButtonHTMLAttributes<T> {
  children: ReactNode;
  isActive?: boolean;
}

const Button = <T extends HTMLButtonElement>({
  children,
  ...rest
}: ButtonProps<T>): JSX.Element => (
  <ButtonStyled {...rest}>{children}</ButtonStyled>
);

export const OutlineButton = <T extends HTMLButtonElement>({
  children,
  ...rest
}: ButtonProps<T>): JSX.Element => (
  <Button className="button--outline" {...rest}>
    {children}
  </Button>
);

export const IconButton = <T extends HTMLButtonElement>({
  children,
  ...rest
}: ButtonProps<T>): JSX.Element => (
  <Button className="button--icon" {...rest}>
    {children}
  </Button>
);

export const ToolButton = <T extends HTMLButtonElement>({
  children,
  isActive,
  ...rest
}: ButtonProps<T>): JSX.Element => (
  <Button
    className={`button--tool button--outline ${
      isActive ? "button--active" : ""
    }`}
    {...rest}
  >
    {children}
  </Button>
);

export default Button;
