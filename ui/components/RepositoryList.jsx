import React, { useEffect, useState } from 'react';
import { Text, Box, List, Inline, Spinner } from '@forge/react';
import { RepositoryItem } from './RepositoryItem';
import { getGithubRepositories } from '../services';

export const RepositoryList = ({ token }) => {
  const [isGithubRepositoriesLoading, setIsGithubRepositoriesLoading] =
    useState(false);
  const [repositories, setRepositories] = useState([]);

  const getRepositories = async () => {
    try {
      const response = await getGithubRepositories(token);
      const data = response.data;

      if (data) {
        setRepositories(response.data);
      }
    } catch (error) {
      console.error({ error }, 'Failed to get repositories');
    } finally {
      setIsGithubRepositoriesLoading(false);
    }
  };

  useEffect(() => {
    setIsGithubRepositoriesLoading(true);

    getRepositories();
  }, []);

  return (
    <Box xcss={{ width: '500px' }} paddingBlockStart="space.500">
      <Text>Repository list:</Text>
      {isGithubRepositoriesLoading ? (
        <Text>
          <Inline>
            <Spinner size="small" />
            Loading...
          </Inline>
        </Text>
      ) : (
        <List type="unordered">
          {repositories.map((repo) => (
            <RepositoryItem key={repo.id} token={token} repository={repo} />
          ))}
        </List>
      )}
    </Box>
  );
};
