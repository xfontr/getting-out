import Field from "../Field/Field";
import { readBoard } from "../../utils/readBoard/readBoard";
import EditTools from "../EditTools/EditTools";
import { FieldProps } from "../../containers/FieldContainer/FieldContainer";
import fieldEditorUtils from "../../utils/fieldEditorUtils/fieldEditorUtils";
import { useEffect } from "react";

const FieldEditor = (props: FieldProps): JSX.Element => {
  const { switchEditTool, resetBoard, disableTools } = fieldEditorUtils(props);
  const { editTool, cells, board, setCells } = props;

  useEffect(() => {
    disableTools();
  }, [cells, disableTools]);

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
      <button onClick={() => {}}>Submit</button>

      <Field
        onClick={() => {
          setCells(readBoard(board));
        }}
        initialBoard={board}
      />
    </>
  );
};

export default FieldEditor;
