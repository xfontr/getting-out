import { ButtonHTMLAttributes, ReactNode } from "react";
import "./css/Button.css";

interface ButtonProps<T> extends ButtonHTMLAttributes<T> {
  children: ReactNode;
}

const Button = <T extends HTMLButtonElement>({
  children,
  ...rest
}: ButtonProps<T>): JSX.Element => <button {...rest}>{children}</button>;

export default Button;
