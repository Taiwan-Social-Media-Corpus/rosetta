import urlJoin from 'url-join';
import { env } from './env';

const url = (...args: string[]) => urlJoin(env.siteUrl as string, ...args);
const serverUrl = (...args: string[]) => urlJoin(env.serverUrl as string, ...args);
const corpus = (...args: string[]) => url('corpus', ...args);
const userAPI = (...args: string[]) => url(env.api as string, 'v1', 'user', ...args);
const corpusAPI = (...args: string[]) => url(env.api as string, 'v1', 'corpus', ...args);

const Route = {
  Home: url(),
  Corpus: {
    Home: corpus(),
    Concordance: corpus('concordance'),
  },
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

const API = {
  user: {
    authUrl: userAPI('auth', 'url'),
    sessions: userAPI('sessions'),
    refresh: userAPI('refresh'),
    csrf: userAPI('_ping'),
  },
  corpus: {
    boards: corpusAPI('boards'),
    concordance: corpusAPI('concordance'),
  },
} as const;

export { Route, Href, API, serverUrl };
