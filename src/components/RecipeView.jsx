import { Loader, MessageState } from './common';
import { RecipeDetail } from './RecipeDetail';

export function RecipeView({
  isRecipeLoading,
  recipeError,
  query,
  searchResults,
  selectedRecipe,
  recipeDetails,
  onToggleBookmark,
  bookmarkList,
  searchError,
}) {
  if (isRecipeLoading) {
    return <Loader />;
  }

  if (searchError) {
    return (
      <MessageState
        icon='🤦'
        title='Oops! We ran into an error.'
        titleColor='text-error'
        message={searchError}
      />
    );
  }

  if (recipeError) {
    return (
      <MessageState
        icon='🤦'
        title='Oops! We ran into an error.'
        titleColor='text-error'
        message={searchError}
      />
    );
  }

  if (!query && searchResults.length === 0 && !selectedRecipe) {
    return (
      <MessageState
        icon='👨‍🍳'
        title='Welcome to RecipeHub'
        message='Start by searching for your favorite recipes or ingredients. Discover thousands of delicious dishes from around the world.'
        linkPage={{
          link: 'https://github.com/mamad-reza-dev/RecipeHub',
          text: 'View Source on My GitHub 🛰️',
        }}
      />
    );
  }

  if (!selectedRecipe) {
    return (
      <MessageState
        title='Select a Recipe'
        icon='🍽️'
        message='Choose a recipe from the sidebar to view its details, ingredients, and cooking instructions.'
      />
    );
  }

  return (
    <RecipeDetail
      key={recipeDetails.id}
      info={recipeDetails}
      onToggleBookmark={onToggleBookmark}
      isBookmarked={bookmarkList.some(
        (bookmark) => bookmark.id === recipeDetails.id,
      )}
    />
  );
}
