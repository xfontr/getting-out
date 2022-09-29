import { HTMLAttributes } from "react";

type MandatoryAttributes = {
  label: string;
  id: string;
  type: React.HTMLInputTypeAttribute;
};

type OptionalAttributes = Omit<Partial<HTMLAttributes<HTMLInputElement>>, "id">;

type CustomAttributes = Partial<{
  initialValue: string | number;
  customGroupClass: string;
  renderAs: "textarea";
}>;

interface InputData extends MandatoryAttributes, CustomAttributes {
  optionalData?: OptionalAttributes;
}

export default InputData;
