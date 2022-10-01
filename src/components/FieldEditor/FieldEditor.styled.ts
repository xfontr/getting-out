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

  .options {
    &__field-size {
      display: flex;
      flex-wrap: wrap;
      gap: ${({ theme: { spacing } }) => spacing.gapSmall};

      padding: ${({ theme }) => theme.shapes.rectangularContainer};
      border-radius: ${({ theme }) => theme.shapes.radiusSmall};
      border: 1px solid ${({ theme }) => theme.colors.primaryDark};
    }
    &__heading {
      display: block;
      width: 100%;
    }
  }
`;

export default FieldEditorStyled;
