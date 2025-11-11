import { useState } from 'react';
import { Header, Logo, SearchBar } from './components/Header.jsx';
import { useFetchData } from './hooks/useFetchData.js';
import {
  SearchSidebar,
  SearchSidebarHeader,
  SearchSidebarMain,
} from './components/SearchSidebar.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { BookmarkPanel } from './components/BookmarkPanel.jsx';
import { Main } from './components/Main.jsx';
import { RecipeView } from './components/RecipeView.jsx';

export function App() {
  const [query, setQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [bookmarkList, setBookmarkList] = useLocalStorage('bookmarks');

  // Fetch search results
  const {
    data: searchResults,
    isLoading: isSearchLoading,
    errorMessage: searchError,
  } = useFetchData({ query });

  // Fetch recipe details
  const {
    data: recipeDetails,
    isLoading: isRecipeLoading,
    errorMessage: recipeError,
  } = useFetchData({ id: selectedRecipe });

  // Sidebar open logic
  const isSidebarOpen =
    !searchError && !recipeError && !!query && !selectedRecipe;

  // Handlers
  function handleSearch(searchValue) {
    const trimmed = searchValue.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    setSelectedRecipe(null);
  }

  function handleSelectRecipe(recipeId) {
    setSelectedRecipe((prev) => (prev === recipeId ? null : recipeId));
  }

  function handleToggleBookmark(recipeObj) {
    const isBookmarked = bookmarkList.some(
      (bookmark) => bookmark.id === recipeObj.id,
    );
    setBookmarkList((prev) =>
      isBookmarked
        ? prev.filter((bookmark) => bookmark.id !== recipeObj.id)
        : [...prev, recipeObj],
    );
  }

  return (
    <div className='flex h-screen flex-col'>
      <Header>
        <Logo />
        <SearchBar onSearch={handleSearch} />
        <BookmarkPanel
          bookmarkList={bookmarkList}
          selectedRecipe={selectedRecipe}
          onSelectedRecipe={handleSelectRecipe}
        />
      </Header>

      <div className='flex flex-1 overflow-hidden'>
        <SearchSidebar isOpen={isSidebarOpen}>
          <SearchSidebarHeader
            query={query}
            numResult={searchResults?.length || 0}
          />
          <SearchSidebarMain
            query={query}
            isSearchLoading={isSearchLoading}
            searchResults={searchResults}
            searchError={searchError}
            selectedRecipe={selectedRecipe}
            onSelectRecipe={handleSelectRecipe}
          />
        </SearchSidebar>

        <Main>
          <RecipeView
            isRecipeLoading={isRecipeLoading}
            recipeError={recipeError}
            query={query}
            searchResults={searchResults}
            selectedRecipe={selectedRecipe}
            recipeDetails={recipeDetails}
            onToggleBookmark={handleToggleBookmark}
            bookmarkList={bookmarkList}
            searchError={searchError}
          />
        </Main>
      </div>
    </div>
  );
}
