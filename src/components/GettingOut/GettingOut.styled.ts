import styled from "styled-components";

const GettingOutStyled = styled.div`
  padding: ${({ theme: { spacing } }) => spacing.gapBig};

  h1 {
    margin-bottom: 2rem;
  }
`;

export default GettingOutStyled;
