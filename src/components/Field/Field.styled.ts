import styled from "styled-components";
import { FieldStypedProps } from "./Field";

const FieldStyled = styled.div<FieldStypedProps>`
  display: flex;
  flex-wrap: wrap;
  width: calc(3rem * ${(props) => props.fieldSize});
  height: calc(3rem * ${(props) => props.fieldSize});
`;

export default FieldStyled;
