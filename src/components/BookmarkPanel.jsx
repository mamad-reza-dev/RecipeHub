import { useState } from 'react';
import { Button, MessageState, ResultCard, Icon } from './common';

export function BookmarkPanel({
  bookmarkList,
  selectedRecipe,
  onSelectedRecipe,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleTogglePanel() {
    setIsOpen((prevState) => !prevState);
  }

  function handleClosePanel() {
    setIsOpen(false);
  }

  return (
    <div className='relative'>
      <BookmarkButton
        isOpen={isOpen}
        count={bookmarkList.length}
        onToggle={handleTogglePanel}
      />
      {isOpen && (
        <BookmarkListPanel
          bookmarkList={bookmarkList}
          selectedRecipe={selectedRecipe}
          onSelectedRecipe={onSelectedRecipe}
          onClosePanel={handleClosePanel}
        />
      )}
    </div>
  );
}

function BookmarkButton({ isOpen, count, onToggle }) {
  const renderIcon = () => {
    if (isOpen) return <Icon name='x-mark' />;
    return count > 0 ? (
      <Icon name='bookmark' className='fill-primary stroke-transparent' />
    ) : (
      <Icon name='bookmark' />
    );
  };

  return (
    <Button
      aria-label={isOpen ? 'Close bookmarks panel' : 'Open bookmarks panel'}
      onClick={onToggle}
      type={isOpen ? 'primary' : 'ghost'}
      size='square'
      customStyle='relative'
    >
      {renderIcon()}
      {count > 0 && (
        <span className='bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full text-[10px] font-medium'>
          {count}
        </span>
      )}
    </Button>
  );
}

function BookmarkListPanel({
  bookmarkList,
  selectedRecipe,
  onSelectedRecipe,
  onClosePanel,
}) {
  return (
    <div className='bg-card absolute top-full right-0 z-50 mt-2 flex max-h-96 w-72 flex-col gap-2 overflow-auto rounded-xl border p-2 shadow-lg md:w-80'>
      {bookmarkList.length === 0 ? (
        <MessageState
          icon='🔖'
          title='No bookmarks yet.'
          message='Start adding your favorite recipes!'
        />
      ) : (
        bookmarkList.map((item) => (
          <ResultCard
            key={item.id}
            info={item}
            isSelected={selectedRecipe === item.id}
            onSelectRecipe={() => {
              onSelectedRecipe(item.id);
              onClosePanel();
            }}
          />
        ))
      )}
    </div>
  );
}
