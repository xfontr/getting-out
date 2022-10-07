import styled from "styled-components";

const EditToolsStyled = styled.div`
  display: flex;
  gap: ${({ theme: { spacing } }) => spacing.gap};
  flex-wrap: wrap;
  align-items: center;
  max-width: 40%;

  .tools {
    &__group {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__placed {
      margin-bottom: 0.2rem;
    }
  }
`;

export default EditToolsStyled;
