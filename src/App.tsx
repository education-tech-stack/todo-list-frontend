import axios from 'axios';
import { RouterProvider } from 'react-router-dom';

import router from './routes/Router';

axios.defaults.withCredentials = true;

function App(): JSX.Element {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}

export default App;
