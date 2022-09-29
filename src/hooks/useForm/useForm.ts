import { useState } from "react";
import InputData from "../../types/InputData";

const useForm = (schema: InputData[]) => {
  const initialState = (
    schema: InputData[]
  ): Record<string, string | number> => {
    const state: Record<string, string | number> = {};
    schema.forEach(
      ({ id, initialValue }) => (state[id] = initialValue ? initialValue : "")
    );

    return state;
  };

  const [values, setValues] = useState<Record<string, string | number>>(
    initialState(schema)
  );

  const handleChange = ({
    currentTarget: { id, value },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({ ...values, [id]: value });
  };

  const inputProps = (
    inputData: InputData,
    value: string | number,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  ) => ({
    id: inputData.id,
    type: inputData.type,
    placeholder: inputData?.placeholder,
    renderAs: inputData?.renderAs,
    className: inputData?.className,
    value,
    onChange,
  });

  return { values, handleChange, inputProps };
};

export default useForm;
