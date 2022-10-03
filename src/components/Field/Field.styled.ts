import styled from "styled-components";
import { FieldStypedProps } from "./Field";

const FieldStyled = styled.div<FieldStypedProps>`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: calc(3rem * ${(props) => props.fieldSize});
  height: calc(3rem * ${(props) => props.fieldSize});
  background: url("img/beige-paper.png") rgba(120, 4, 0, 0.7);
`;

export default FieldStyled;
