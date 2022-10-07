import styled from "styled-components";
import { FieldStypedProps } from "./Field";

export const FieldContainer = styled.div`
  background: url(img/mocha-grunge.png) rgb(253, 240, 213, 0.5);
  padding: 2rem;
`;

const FieldStyled = styled.div<FieldStypedProps>`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: calc(3rem * ${(props) => props.fieldSize});
  height: calc(3rem * ${(props) => props.fieldSize});
  background: url("img/beige-paper.png") rgba(120, 4, 0, 1);
  box-shadow: inset 10px 10px 30px 10px rgba(0, 0, 0, 0.2);

  -webkit-clip-path: polygon(
    0% 15%,
    1% 1%,
    15% 0%,
    82% 1%,
    99% 1%,
    100% 15%,
    99% 84%,
    99% 100%,
    85% 99%,
    15% 100%,
    1% 98%,
    1% 84%
  );
  clip-path: polygon(
    0% 15%,
    1% 1%,
    15% 0%,
    82% 1%,
    99% 1%,
    100% 15%,
    99% 84%,
    99% 100%,
    85% 99%,
    15% 100%,
    1% 98%,
    1% 84%
  );
`;

export default FieldStyled;
