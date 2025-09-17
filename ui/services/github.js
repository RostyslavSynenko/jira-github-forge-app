import { invoke } from '@forge/bridge';

export const getGithubRepositories = (token) => {
  return invoke('getGithubRepositories', { token });
};

export const getGithubRepositoryPullRequests = (token, owner, repository) => {
  return invoke('getGithubRepositoryPullRequests', {
    token,
    owner,
    repository,
  });
};
