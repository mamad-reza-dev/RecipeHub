import { useEffect, useState } from 'react';

export function useLocalStorage(key) {
  const [data, setData] = useState(getLocalStorage);

  function getLocalStorage() {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  return [data, setData];
}
