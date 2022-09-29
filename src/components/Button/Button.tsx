import { ButtonHTMLAttributes, ReactNode } from "react";
import ButtonStyled from "./Button.styled";

interface ButtonProps<T> extends ButtonHTMLAttributes<T> {
  children: ReactNode;
}

const Button = <T extends HTMLButtonElement>({
  children,
  ...rest
}: ButtonProps<T>): JSX.Element => (
  <ButtonStyled {...rest}>{children}</ButtonStyled>
);

export default Button;
