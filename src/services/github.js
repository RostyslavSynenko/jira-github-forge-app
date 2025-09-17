import api from '@forge/api';

export const getGithubRepositories = async (token) => {
  try {
    const response = await api.fetch('https://api.github.com/user/repos', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
      },
    });

    const res = await response.json();

    return {
      success: true,
      data: res,
    };
  } catch (error) {
    console.error({ error }, 'Failed to get user repositories');

    return {
      success: false,
      error: 'Failed to get user repositories',
    };
  }
};

export const getGithubRepositoryPullRequests = async (
  token,
  owner,
  repository
) => {
  try {
    const response = await api.fetch(
      `https://api.github.com/repos/${owner}/${repository}/pulls`,
      {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
        },
      }
    );

    const res = await response.json();

    return {
      success: true,
      data: res,
    };
  } catch (error) {
    console.error({ error }, 'Failed to get repository pull requests');

    return {
      success: false,
      error: 'Failed to get repository pull requests',
    };
  }
};
