import { renderHook } from "@testing-library/react";
import schema from "../../schemas/editField.form";
import InputData from "../../types/InputData";
import useForm from "./useForm";

describe("Given a useForm function", () => {
  describe("When called with a form field schema", () => {
    const {
      result: {
        current: { values, inputProps },
      },
    } = renderHook(() => useForm(schema));

    test("Then it should return an object of values of each input value", () => {
      const expectedValues = {
        [schema[0].id]: schema[0].initialValue,
        [schema[1].id]: schema[1].initialValue,
      };

      expect(values).toStrictEqual(expectedValues);
    });

    test("Then it should return a inputProps function which will return the full input data", () => {
      const value = 1234;
      const handleChange = () => {};

      const expectedProps = {
        id: schema[0].id,
        type: schema[0].type,
        className: `form__input `,
        value,
        onChange: handleChange,
      };

      const result = inputProps(schema[0], value);

      expect(JSON.stringify(result)).toStrictEqual(
        JSON.stringify(expectedProps)
      );
    });

    test("Then the input data returned by the inputProps function should include any custom class", () => {
      const customClass = "input__custom-class";
      const value = 1234;
      const customSchema: InputData[] = [
        {
          label: "Time limit",
          id: "timeLeft",
          type: "number",
          initialValue: 10,
          optionalData: {
            className: customClass,
          },
        },
      ];

      const {
        result: {
          current: { inputProps: customInputProps },
        },
      } = renderHook(() => useForm(customSchema));

      const result = customInputProps(customSchema[0], value);

      expect(result.className).toBe(`form__input ${customClass}`);
    });
  });
});
