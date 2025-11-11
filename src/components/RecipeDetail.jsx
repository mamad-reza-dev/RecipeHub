import { useState } from 'react';
import { Button, Icon, ImageWithSkeleton } from './common';

export function RecipeDetail({ info, onToggleBookmark, isBookmarked }) {
  const [servingCount, setServingCount] = useState(4);

  function handleIncreaseServingCount() {
    setServingCount((prevState) => prevState + 1);
  }

  function handleDecrementServing() {
    setServingCount((prevState) => (prevState === 1 ? 1 : prevState - 1));
  }

  return (
    <>
      <RecipeDetailHeader
        title={info.title}
        imgSrc={info.image_url}
        publisher={info.publisher}
      />
      <RecipeStats>
        <CookingTimeCard cookingTime={info.cooking_time} />
        <ServingsCard
          servingCount={servingCount}
          onDecrementServing={handleDecrementServing}
          onIncreaseServingCount={handleIncreaseServingCount}
        />
        <BookmarkCard
          isBookmarked={isBookmarked}
          onBookmarked={onToggleBookmark}
          info={info}
        />
      </RecipeStats>
      <IngredientsList
        title={info.title}
        servingCount={servingCount}
        ingredients={info.ingredients}
      />
    </>
  );
}

function RecipeDetailHeader({ imgSrc, title, publisher }) {
  return (
    <figure className='relative mb-4 h-68 overflow-hidden rounded-lg border shadow md:mb-8 md:h-96'>
      <ImageWithSkeleton
        src={imgSrc}
        className='h-full w-full object-cover'
        alt={title}
      />
      <div className='from-primary/70 absolute inset-0 bg-gradient-to-t to-transparent'></div>
      <figcaption className='text-primary-foreground absolute right-0 bottom-0 left-0 p-4 md:p-6'>
        <h2 className='mb-1 text-2xl font-bold text-balance md:mb-2 md:text-4xl'>
          {title}
        </h2>
        <p className='text-sm opacity-90 md:text-lg'>{publisher}</p>
      </figcaption>
    </figure>
  );
}

function RecipeStats({ children }) {
  return (
    <div className='mb-4 grid grid-cols-1 gap-3 md:mb-8 md:grid-cols-3 md:gap-4'>
      {children}
    </div>
  );
}

function CookingTimeCard({ cookingTime }) {
  return (
    <div className='bg-card flex flex-col items-center gap-3 rounded-xl border p-3 text-center shadow-sm md:p-4'>
      <Icon name='clock' />
      <div className='flex flex-1 flex-col gap-2'>
        <h3 className='text-muted-foreground text-xs md:text-sm'>
          Cooking Time
        </h3>
        <p className='text-sm font-bold md:text-base'>{cookingTime} minutes</p>
      </div>
    </div>
  );
}

function ServingsCard({
  servingCount,
  onDecrementServing,
  onIncreaseServingCount,
}) {
  return (
    <div className='bg-card flex flex-col items-center gap-3 rounded-xl border p-3 text-center shadow-sm md:p-4'>
      <Icon name='people' />
      <div className='flex flex-1 flex-col gap-2'>
        <h3 className='text-muted-foreground text-xs md:text-sm'>Servings</h3>
        <div className='flex items-center gap-2'>
          <Button
            type='ghost'
            size='squareMini'
            onClick={onDecrementServing}
            aria-label='Decrement serving count'
          >
            <Icon name='minus' />
          </Button>
          <p className='text-foreground min-w-[3ch] text-center text-sm font-semibold md:text-base'>
            {servingCount}
          </p>
          <Button
            type='ghost'
            size='squareMini'
            onClick={onIncreaseServingCount}
            aria-label='Increase serving count '
          >
            <Icon name='plus' />
          </Button>
        </div>
      </div>
    </div>
  );
}

function BookmarkCard({ isBookmarked, onBookmarked, info }) {
  const handleBookmarkClick = () => {
    const { id, title, publisher, image_url } = info;
    onBookmarked({ id, title, publisher, image_url });
  };

  const btnAriaLabel = isBookmarked ? 'Remove Bookmark' : 'Add Bookmark';
  const btnIcon = isBookmarked ? (
    <Icon name='bookmark-slash' />
  ) : (
    <Icon name='bookmark' />
  );
  const btnContent = isBookmarked ? 'Unbookmark' : 'Bookmark';

  return (
    <div className='bg-card flex flex-col items-center gap-3 rounded-xl border p-3 text-center shadow-sm md:p-4'>
      <Button
        type='secondary'
        size='square'
        onClick={handleBookmarkClick}
        aria-label={btnAriaLabel}
      >
        {btnIcon}
        <span className='hidden text-xs sm:inline lg:text-base'>
          {btnContent}
        </span>
      </Button>
      <a href={info.source_url} target='_blank'>
        <Button
          type='secondary'
          size='square'
          aria-label='Go to source website'
        >
          <Icon name='link' />
          <span className='hidden text-xs sm:inline lg:text-base'>Source</span>
        </Button>
      </a>
    </div>
  );
}

function IngredientsList({ title, ingredients, servingCount }) {
  return (
    <div className='bg-card flex flex-col gap-6 rounded-xl border p-4 shadow-sm md:p-6'>
      <h2 className='mb-3 text-xl font-semibold md:mb-4 md:text-2xl'>
        {title}
      </h2>
      <ul className='space-y-2 md:space-y-3'>
        {ingredients?.map((ingredient, index) => (
          <IngredientItem
            ingredient={ingredient}
            servingCount={servingCount}
            key={index}
          />
        ))}
      </ul>
    </div>
  );
}

function IngredientItem({ ingredient, servingCount }) {
  const { quantity, unit, description } = ingredient;

  const calculatedQuantity = quantity ? quantity * servingCount : '';

  return (
    <li className='flex gap-1 md:gap-2'>
      <span className='text-list-marker mt-1'>•</span>
      <span className='text-sm md:text-base'>
        {quantity && (
          <span className='font-medium'>
            {calculatedQuantity} {unit}&nbsp;
          </span>
        )}
        {description}
      </span>
    </li>
  );
}
