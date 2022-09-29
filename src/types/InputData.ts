type MandatoryInputData = {
  label: string;
  id: string;
  type: React.HTMLInputTypeAttribute;
};

type OptionalInputData = {
  initialValue: string | number;
  placeholder: string;
  className: string;
  customGroupClass: string;
  renderAs: "textarea";
};

interface InputData extends MandatoryInputData, Partial<OptionalInputData> {}

export default InputData;
