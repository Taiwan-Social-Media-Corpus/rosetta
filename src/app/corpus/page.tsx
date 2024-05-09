import Corpus from '@views/Corpus/Home';
import { getBoards } from '@services/corpus/boards';
import { Suspense } from 'react';
import Loading from './loading';

async function CorpusPage() {
  const [data, error] = await getBoards();
  if (!data || error) {
    throw new Error('Cannot get boards data');
  }

  return (
    <Suspense fallback={<Loading />}>
      <Corpus boards={data} />;
    </Suspense>
  );
}

export default CorpusPage;
