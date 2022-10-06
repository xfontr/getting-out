import styled from "styled-components";

const EndGameStyled = styled.div`
  .read-only {
    position: relative;
    width: fit-content;
    margin-bottom: ${({ theme: { spacing } }) => spacing.gap};
  }

  .read-only::after {
    content: "";
    position: absolute;
    z-index: 145132;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .options {
    display: flex;
    gap: ${({ theme: { spacing } }) => spacing.gap};
  }
`;

export default EndGameStyled;
