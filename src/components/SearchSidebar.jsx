import { Loader, ResultCard, MessageState } from './common';

export function SearchSidebar({ children, isOpen }) {
  const sidebarStateClass = isOpen
    ? 'w-full translate-x-0'
    : '-translate-x-full sm:translate-x-0';

  return (
    <aside
      className={`bg-card fixed inset-y-0 left-0 z-40 w-48 flex-shrink-0 transform border-r transition-transform duration-300 ease-in-out sm:relative sm:w-72 lg:w-80 ${sidebarStateClass} top-16 sm:top-0`}
    >
      {children}
    </aside>
  );
}

export function SearchSidebarHeader({ query, numResult }) {
  const hasQuery = query.trim().length > 0;
  const titleText = hasQuery ? `Result for ${query}` : 'Search Results';
  const subtitleText = numResult ? `${numResult} recipes` : '';
  return (
    <header className='border-b p-2 sm:p-3 md:p-4'>
      <h2 className='text-xs font-medium sm:text-sm md:text-base'>
        {titleText}
      </h2>
      <p className='text-muted-foreground mt-1 text-[10px] sm:text-xs md:text-sm'>
        {subtitleText}
      </p>
    </header>
  );
}

export function SearchSidebarMain({
  query,
  isSearchLoading,
  searchResults,
  searchError,
  selectedRecipe,
  onSelectRecipe,
}) {
  let content;

  if (isSearchLoading) {
    content = <Loader />;
  } else if (searchError) {
    content = null;
  } else if (query && searchResults.length === 0) {
    content = (
      <MessageState
        icon='🤷'
        title='No recipes found.'
        message='Try different search.'
      />
    );
  } else if (query && searchResults.length > 0) {
    content = searchResults.map((recipe) => (
      <ResultCard
        key={recipe.id}
        info={recipe}
        isSelected={selectedRecipe === recipe.id}
        onSelectRecipe={() => onSelectRecipe(recipe.id)}
      />
    ));
  }

  return (
    <div className='relative h-[calc(100vh-8rem)] sm:pb-6'>
      <div className='flex size-full flex-col gap-4 overflow-y-scroll p-4 transition-[color,box-shadow] outline-none'>
        {content}
      </div>
    </div>
  );
}
