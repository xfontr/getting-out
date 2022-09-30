import { InputHTMLAttributes, useState } from "react";
import InputData from "../../types/InputData";

const useForm = (schema: InputData[]) => {
  const initialState = (): Record<string, string | number> => {
    const state: Record<string, string | number> = {};
    schema.forEach(
      ({ id, initialValue }) => (state[id] = initialValue ? initialValue : "")
    );

    return state;
  };

  const [values, setValues] = useState<Record<string, string | number>>(
    initialState()
  );

  const handleChange = ({
    currentTarget: { id, value },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({ ...values, [id]: value });
  };

  const inputProps = (
    inputData: InputData,
    value: string | number,
    onChange = handleChange
  ): InputHTMLAttributes<HTMLInputElement> => ({
    ...inputData.optionalData,
    id: inputData.id,
    type: inputData.type,
    className: `form__input ${
      inputData.optionalData?.className ? inputData.optionalData.className : ""
    }`,
    value,
    onChange,
  });

  return { values, inputProps };
};

export default useForm;
