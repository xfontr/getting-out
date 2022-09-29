import styled from "styled-components";

const FieldEditorStyled = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme: { spacing } }) => spacing.gap};

  .edit {
    &__options {
      display: flex;
      flex-direction: row;
      gap: ${({ theme: { spacing } }) => spacing.gap};
    }
  }
`;

export default FieldEditorStyled;
