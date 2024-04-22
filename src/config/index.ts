import urlJoin from 'url-join';
import { env } from './env';

const url = (...args: string[]): string => urlJoin(env.siteUrl as string, ...args);
const corpus = (...args: string[]) => url('corpus', ...args);

const Route = {
  Home: url(),
  Corpus: corpus(),
  NotFound: url('404'),
} as const;

const Href = {
  Avatar: 'https://lopen.linguistics.ntu.edu.tw/lopen_logo.jpg',
  Facebook: 'https://www.facebook.com/groups/174362969268953',
  Github: {
    Lopen: 'https://github.com/lopentu',
    Organization: 'https://github.com/Taiwan-Social-Media-Corpus',
    Discussion: 'https://github.com/Taiwan-Social-Media-Corpus/rosetta/discussions',
    Releases: 'https://github.com/Taiwan-Social-Media-Corpus/rosetta/releases',
  },
} as const;

export { Route, Href };
