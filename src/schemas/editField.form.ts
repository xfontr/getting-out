import InputData from "../types/InputData";

const editFieldForm: InputData[] = [
  {
    label: "Time limit",
    id: "timeLeft",
    type: "number",
    initialValue: 10,
  },
  {
    label: "Shoots",
    id: "shoots",
    type: "number",
    initialValue: 3,
  },
];

export default editFieldForm;
