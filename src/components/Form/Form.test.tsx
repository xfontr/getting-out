import { renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useForm from "../../hooks/useForm/useForm";
import schema from "../../schemas/editField.form";
import { render } from "../../test-utils/customRender/customRender";
import Form from "./Form";

describe("Given a Form component", () => {
  const {
    result: {
      current: { values, inputProps },
    },
  } = renderHook(() => useForm(schema));
  describe("When instantiated with a form schema, input values and input props", () => {
    test("Then it should render all the inputs in the schema with the specified conditions", () => {
      render(<Form inputProps={inputProps} values={values} schema={schema} />);

      const form = [
        screen.getByLabelText(schema[0].label),
        screen.getByLabelText(schema[1].label),
      ];

      form.forEach((input, index) => expect(input).toBeInTheDocument());

      form.forEach((input, index) =>
        expect(input).toHaveValue(schema[index].initialValue)
      );
    });

    test("Then the input types should be as specified in the schema", async () => {
      const wrongInput = "hi";

      render(<Form inputProps={inputProps} values={values} schema={schema} />);

      const numericInput = screen.getByLabelText(schema[0].label);

      await userEvent.type(numericInput, wrongInput);

      expect(numericInput).toHaveValue(schema[0].initialValue);
    });
  });
});
