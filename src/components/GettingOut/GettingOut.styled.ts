import styled from "styled-components";

const GettingOutStyled = styled.div`
  padding: ${({ theme: { spacing } }) => spacing.gapBig};

  .game {
    &__heading {
      margin-bottom: 0rem;
    }
    &__subheading {
      margin-bottom: 2rem;
    }
  }
`;

export default GettingOutStyled;
