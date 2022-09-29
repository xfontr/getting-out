import { FormHTMLAttributes, ReactNode } from "react";
import useForm from "../../hooks/useForm/useForm";
import InputData from "../../types/InputData";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  schema: InputData[];
  children?: ReactNode;
}

const Form = ({ schema, children, ...rest }: FormProps) => {
  const { values, inputProps, handleChange } = useForm(schema);

  return (
    <form {...rest}>
      {children}
      {schema.map((input) => (
        <div className="form__container" key={input.id}>
          <label htmlFor={input.id}>{input.label}</label>
          <input {...inputProps(input, values[input.id], handleChange)} />
        </div>
      ))}
    </form>
  );
};

export default Form;
