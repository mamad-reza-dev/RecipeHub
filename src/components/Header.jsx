import { Button, Icon } from './common';
import { useState } from 'react';

export function Header({ children }) {
  return (
    <header className='bg-card border-b py-1'>
      <div className='flex h-16 items-center justify-between gap-4 px-3 md:gap-8 md:px-6'>
        {children}
      </div>
    </header>
  );
}

export function Logo() {
  return (
    <div className='flex items-center gap-1 md:gap-2'>
      <span className='text-2xl md:text-3xl'>👨‍🍳</span>
      <h1 className='hidden text-base font-semibold sm:block md:text-xl'>
        RecipeHub
      </h1>
    </div>
  );
}

export function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  function handleSubmit(ev) {
    ev.preventDefault();
    onSearch(input);
    setInput('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='relative flex w-full max-w-2xl min-w-0 flex-1'
    >
      <input
        value={input}
        onChange={(ev) => setInput(ev.target.value)}
        type='text'
        placeholder='Search recipes...'
        className='border-input bg-background placeholder:text-muted-foreground focus:border-primary w-full min-w-0 flex-1 rounded-md border py-2 pr-12 pl-3 text-sm shadow-xs transition-[border,box-shadow] outline-none focus:shadow-md sm:text-base'
      />

      {/* Desktop Button */}
      <Button
        customStyle='
          hidden md:flex absolute right-1 top-1 bottom-1
          px-3 text-sm font-medium
        '
      >
        Search
      </Button>

      {/* Mobile Button */}
      <Button
        size='square'
        customStyle='
          flex md:hidden absolute right-1 top-1 bottom-1
        '
      >
        <Icon name='magnifying-glass' />
      </Button>
    </form>
  );
}
