import { ImageWithSkeleton } from './ImageWithSkeleton.jsx';

export function ResultCard({ info, isSelected, onSelectRecipe }) {
  const selectedCardClassName =
    'bg-surface-selected border-card-selected shadow-selected';

  const noSelectedCardClassName =
    'bg-card hover:bg-hover-bg border border-border shadow-xs hover:shadow-sm transition-colors';

  return (
    <div
      title={info.title}
      onClick={onSelectRecipe}
      className={`flex min-h-[90px] w-full cursor-pointer items-center gap-6 rounded-xl border p-3 shadow-sm transition-colors sm:p-3 ${isSelected ? selectedCardClassName : noSelectedCardClassName} `}
    >
      <ImageWithSkeleton
        src={info.image_url}
        alt={info.title}
        width='w-16'
        className='flex-shrink-0'
      />
      <div className='flex h-full min-w-0 flex-1 flex-col justify-between'>
        <h3 className='line-clamp-2 text-sm font-medium sm:text-xs md:text-sm'>
          {info.title}
        </h3>
        <p className='mt-0.5 truncate text-xs text-zinc-600 sm:mt-1 sm:text-sm'>
          {info.publisher}
        </p>
      </div>
    </div>
  );
}
