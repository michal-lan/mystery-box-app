import axios from 'axios';
import { API_URL_FIGURES, API_KEY } from '../config/constants';

/**
 * Function that should return minifigs of Harry Potter from Rebrickable API
 * 
 * @returns array of minifigs objects
 */
async function getThreeRandomFigures(): Promise<Object[]> {
  let figures : Object[] = [];

  try {
    const response = await axios.get(API_URL_FIGURES, {
      params: {
          key: API_KEY,
          page_size: 1000,
          in_theme_id: 246,
          ordering: 'name'
      }
    });

    if ( Array.isArray(response.data.results) ) {
      // receive all unshuffled figures and shuffle them and choose first three
      const unshuffled = response.data.results;
      const shuffled = unshuffled
        .map((value: object) => ({ value, sort: Math.random() }))
        .sort((a: { sort: number; }, b: { sort: number; }) => a.sort - b.sort)
        .map(({ value }: { value : object }) => value)
        .slice(0, 3);
      figures = shuffled;
    }
  } catch (error) {
    console.error(error);
  }

  return figures;
}

export default getThreeRandomFigures;