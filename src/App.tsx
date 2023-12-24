// eslint-disable-next-line import/no-extraneous-dependencies
import useSWR from 'swr';

import BoardUI from './components/Board';
import fetcher from './utils/fetcher';
import { initData2 } from './utils/initData';

function App(): JSX.Element {
  // const { data, error, isLoading } = useSWR(
  //   `${process.env.SERVER}/todos/board`,
  //   fetcher
  // ); // data should arrive in order
  const { data, error, isLoading } = {
    data: initData2,
    error: null,
    isLoading: false,
  };

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  return <BoardUI data={data} />;
}

export default App;
