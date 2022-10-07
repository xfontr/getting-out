import styled from "styled-components";

const EndGameStyled = styled.section`
  .header {
    padding: ${({ theme: { spacing } }) => spacing.gapBig};

    background-color: ${({ theme: { colors } }) => colors.contrast};
    color: ${({ theme: { colors } }) => colors.secondary};

    display: flex;
    flex-direction: column;
    gap: ${({ theme: { spacing } }) => spacing.gap};
  }

  .read-only {
    position: relative;
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

    button {
      color: ${({ theme: { colors } }) => colors.secondary};
      border-color: ${({ theme: { colors } }) => colors.secondary};
    }
  }
`;

export default EndGameStyled;
