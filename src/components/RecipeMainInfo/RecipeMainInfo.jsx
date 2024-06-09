import React from "react";
import {
  AuthorInfoWrapper,
  AuthorTextWrapper,
  ButtonWrapper,
  CreatedByText,
  RecipeCategory,
  RecipeMainInfoContainer,
  RecipeTime,
} from "./RecipeMainInfo.styled";
import AvatarButton from "components/Buttons/AvatarButton";
import SectionTitle from "components/SectionTitle";
import SubTitle from "components/SubTitle";

const RecipeMainInfo = ({ recipe, author, onSignIn, onProfile }) => {
  const handleAuthorClick = () => {
    if (author.isAuthenticated) {
      onProfile(author.id);
    } else {
      onSignIn();
    }
  };
  return (
    <RecipeMainInfoContainer>
      <SectionTitle label={recipe.title} />
      <ButtonWrapper>
        <RecipeCategory>{recipe.category}</RecipeCategory>
        <RecipeTime> {recipe.time} min</RecipeTime>
      </ButtonWrapper>
      <SubTitle label={recipe.description} />
      <AuthorInfoWrapper>
        <AvatarButton
          author={author}
          onClick={handleAuthorClick}
          showName={false}
        />
        <AuthorTextWrapper>
          <CreatedByText>Created by:</CreatedByText>
          <>{author.name}</>
        </AuthorTextWrapper>
      </AuthorInfoWrapper>
    </RecipeMainInfoContainer>
  );
};

export default RecipeMainInfo;