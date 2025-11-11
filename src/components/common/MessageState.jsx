export function MessageState({
  icon,
  title,
  titleColor = 'text-inherit',
  message,
  linkPage,
}) {
  return (
    <div className='flex h-full items-center justify-center p-8'>
      <div className='max-w-md text-center'>
        {icon && <span className='mb-4 block text-6xl'>{icon}</span>}
        {title && (
          <h2 className={`${titleColor} mb-2 text-xl font-semibold`}>
            {title}
          </h2>
        )}
        {message && <p className='text-muted-foreground'>{message}</p>}
        {linkPage && (
          <a
            href={linkPage.link}
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary mt-4 inline-block hover:underline'
          >
            {linkPage.text}
          </a>
        )}
      </div>
    </div>
  );
}
