export function Button({
  children,
  type = 'primary',
  size = 'md',
  disabled = false,
  customStyle = '',
  ...rest
}) {
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary:
      'bg-secondary text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary border',
    ghost: 'bg-transparent text-foreground  hover:bg-muted hover:text-primary',
  };

  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    square: 'p-2',
    squareMini: 'p-1',
  };

  const className = `
    ${variants[type]}
    ${sizes[size]}
    flex items-center gap-1 justify-center rounded-md
    transition-colors duration-200
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${customStyle}
  `;

  return (
    <button className={className} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
