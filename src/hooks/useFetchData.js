import { useEffect, useState } from 'react';
import { isUserFromIran } from '../utils/network.js';

const BASE_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes';
const KEY = '5ec4fd32-1cb7-4318-b062-0126194a882d';

export function useFetchData({ query = '', id = '' }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setData([]);
    setErrorMessage('');

    if (!query.trim() && !id) return;

    const controller = new AbortController();

    async function fetchData() {
      try {
        setIsLoading(true);

        const url = id
          ? `${BASE_URL}/${id}?key=${KEY}`
          : `${BASE_URL}?search=${query}&key=${KEY}`;

        const resp = await fetch(url, { signal: controller.signal });
        if (!resp.ok) throw new Error(`HTTP Error: ${resp.status}`);

        const result = await resp.json();

        setData(id ? result.data.recipe : result.data.recipes);
      } catch (error) {
        if (error.name === 'AbortError') return;

        if (
          error.message === 'Failed to fetch' ||
          error.message.includes('NetworkError')
        ) {
          setErrorMessage(
            (await isUserFromIran())
              ? 'It looks like you’re connecting from Iran 🇮🇷. Please use a VPN to access RecipeHub.'
              : 'No internet connection. Please check your network and try again.',
          );
        } else {
          setErrorMessage('Server error. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, [query, id]);

  return { data, isLoading: isLoading, errorMessage };
}
