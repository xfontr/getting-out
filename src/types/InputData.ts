type MandatoryInputData = {
  label: string;
  name: string;
};

type OptionalInputData = {
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  customClass: string;
  customGroupClass: string;
  renderAs: "textarea";
};

interface InputData extends MandatoryInputData, Partial<OptionalInputData> {}

export default InputData;
