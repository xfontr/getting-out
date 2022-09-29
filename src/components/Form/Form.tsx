import { FormHTMLAttributes, ReactNode } from "react";
import InputData from "../../types/InputData";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  schema: InputData[];
  children: ReactNode;
}

const Form = ({ schema, children, ...rest }: FormProps) => (
  <form {...rest}>
    {children}
    {schema.map((input) => (
      <div className="form__container">
        <label htmlFor={input.name}>{input.label}</label>
        <input type={input.type} id={input.name} />
      </div>
    ))}
  </form>
);

export default Form;
