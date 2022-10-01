import styled from "styled-components";

const AppStyled = styled.div`
  padding: ${({ theme }) => theme.spacing.paddingSmall};
  padding-bottom: 2.5rem;
  max-width: ${({ theme }) => theme.breakpoints.verySmall};
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.verySmall}) {
    max-width: ${({ theme }) => theme.breakpoints.big};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.big}) {
    max-width: ${({ theme }) => theme.breakpoints.large};
  }
`;

export default AppStyled;
