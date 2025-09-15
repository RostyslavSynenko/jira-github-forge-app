import Resolver from '@forge/resolver';
import { getStorageData, setStorageData, deleteStorageData } from '../services';

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

export const handler = resolver.getDefinitions();
