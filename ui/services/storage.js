import { invoke } from '@forge/bridge';

export const getStorageData = (key) => {
  return invoke('getStorageData', { key });
};

export const setStorageData = (key, value) => {
  return invoke('setStorageData', {
    key,
    value,
  });
};

export const deleteStorageData = (key) => {
  return invoke('deleteStorageData', {
    key,
  });
};
