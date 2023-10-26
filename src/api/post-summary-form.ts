import axios from 'axios';
import { API_FAKE_URL } from '../config/constants';
import { FormData } from '../types/components/Form/form.type';

/**
 * Function that should send data to fake api and return status of sending.
 * 
 * @returns boolean status of sending
 */
async function postSummaryForm( values : FormData ) {
  let result : boolean = false;

  if ( values ) {
    try {
      const response = await axios.post(API_FAKE_URL, values, {
        headers: {
            'Content-Type': 'application-json; charset=UTF-8',
        }
      });

      if ( response.status === 200 ) {
        result = true;
      }
    } catch ( error ) {
      console.error(error);
    }
  }

  return result;
}

export default postSummaryForm;