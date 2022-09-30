import { FormHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import InputData from "../../types/InputData";
import FormStyled from "./Form.styled";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  schema: InputData[];
  values: Record<string, string | number>;
  inputProps: (
    input: InputData,
    value: string | number
  ) => InputHTMLAttributes<HTMLInputElement>;
  children?: ReactNode;
}

const Form = ({ schema, inputProps, values, children, ...rest }: FormProps) => (
  <FormStyled {...rest}>
    {schema.map((input) => (
      <div className="form__container" key={input.id}>
        <label htmlFor={input.id} className="form__label">
          {input.label}
        </label>
        <input {...inputProps(input, values[input.id])} />
      </div>
    ))}
    {children}
  </FormStyled>
);

export default Form;
