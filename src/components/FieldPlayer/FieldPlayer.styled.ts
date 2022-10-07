import styled from "styled-components";

const FieldPlayerStyled = styled.section`
  .header {
    padding: ${({ theme: { spacing } }) => spacing.gapBig};

    background-color: ${({ theme: { colors } }) => colors.contrast};
    color: ${({ theme: { colors } }) => colors.secondary};

    ul {
      display: flex;
      flex-direction: column;
      gap: ${({ theme: { spacing } }) => spacing.gap};
    }
  }
`;

export default FieldPlayerStyled;
