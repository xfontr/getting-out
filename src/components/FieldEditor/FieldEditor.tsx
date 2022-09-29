import Field from "../Field/Field";
import { readBoard } from "../../utils/readBoard/readBoard";
import EditTools from "../EditTools/EditTools";
import { FieldProps } from "../../containers/FieldContainer/FieldContainer";
import fieldEditorUtils from "../../utils/fieldEditorUtils/fieldEditorUtils";
import { useEffect, useState } from "react";
import boards from "../../data/boards";
import UserBoard from "../../types/UserBoard";

const valuesInitialState = {
  shoots: "",
  timeLeft: "",
};

const FieldEditor = (props: FieldProps): JSX.Element => {
  const {
    switchEditTool,
    resetBoard,
    disableTools,
    increaseSize,
    decreaseSize,
  } = fieldEditorUtils(props);
  const { editTool, cells, board, setCells, fieldSize } = props;

  const [values, setValues] =
    useState<typeof valuesInitialState>(valuesInitialState);
  const { timeLeft, shoots } = values;

  useEffect(() => {
    disableTools();
  }, [cells, disableTools]);

  const handleChange = ({
    currentTarget: { id, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [id]: value });
  };

  return (
    <>
      <p>Current tool: {editTool}</p>

      <ul>
        {Object.entries(cells).map(([type, amount]) => (
          <li key={type}>
            {type}: {amount}
          </li>
        ))}
      </ul>

      <EditTools
        cells={cells}
        editTool={editTool}
        switchEditTool={switchEditTool}
      />

      <button onClick={resetBoard}>Reset board</button>
      <button onClick={increaseSize}>Increase size</button>
      <button onClick={decreaseSize}>Decrease size</button>

      <form>
        <label htmlFor="timer">
          <input
            type="text"
            id="timer"
            onChange={handleChange}
            value={timeLeft}
          />
        </label>
        <label htmlFor="shoots">
          <input
            type="text"
            id="shoots"
            onChange={handleChange}
            value={shoots}
          />
        </label>
      </form>

      <Field
        data-testid="field"
        onClick={() => {
          setCells(readBoard(board));
        }}
        initialBoard={board}
        isEditMode={true}
        fieldSize={fieldSize}
      />

      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default FieldEditor;
