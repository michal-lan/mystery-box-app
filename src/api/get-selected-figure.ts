import axios from 'axios';
import { API_URL_FIGURES, API_KEY } from '../config/constants';

/**
 * Function that should return minifig parts of Harry Potter from Rebrickable API
 * 
 * @returns array of minifig parts objects
 */
async function getSelectedFigure( figureId : string ): Promise<Object[]> {
  let figures : Object[] = [];

  try {
    const response = await axios.get(`${API_URL_FIGURES}${figureId}/parts/`, {
      params: {
          key: API_KEY,
          page_size: 1000,
      }
    });

    if ( Array.isArray(response.data.results) ) {
      figures = response.data.results;
    }
  } catch (error) {
    console.error(error);
  }

  return figures;
}

export default getSelectedFigure;