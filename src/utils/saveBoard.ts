import axios from 'axios';

import Data from '../types';

export default async function saveBoard(state: Data) {
  await axios.post(`${import.meta.env.VITE_SERVER}/todo/saveBoard`, state, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
}
