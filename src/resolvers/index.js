import Resolver from '@forge/resolver';
import {
  getStorageData,
  setStorageData,
  deleteStorageData,
  getGithubRepositories,
  getGithubRepositoryPullRequests,
} from '../services';

const resolver = new Resolver();

resolver.define('getText', (req) => {
  console.log(req);
  return 'Hello, world!';
});

resolver.define('getStorageData', async (req) => {
  const { key } = req.payload;

  return getStorageData(key);
});

resolver.define('setStorageData', async (req) => {
  const { key, value } = req.payload;

  return setStorageData(key, value);
});

resolver.define('deleteStorageData', async (req) => {
  const { key } = req.payload;

  return deleteStorageData(key);
});

resolver.define('getGithubRepositories', async (req) => {
  const { token } = req.payload;

  return getGithubRepositories(token);
});

resolver.define('getGithubRepositoryPullRequests', async (req) => {
  const { token, owner, repository } = req.payload;

  return getGithubRepositoryPullRequests(token, owner, repository);
});

export const handler = resolver.getDefinitions();
