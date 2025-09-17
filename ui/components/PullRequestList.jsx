import React, { useEffect, useState } from 'react';
import { Text, Link, List, ListItem, Inline, Spinner } from '@forge/react';
import { getGithubRepositoryPullRequests } from '../services';
import { JIRA_PROJECT_KEY } from '../constants';

export const PullRequestList = ({ token, owner, repositoryName }) => {
  const [
    isGithubRepositoryPullRequestsLoading,
    setIsGithubRepositoryPullRequestsLoading,
  ] = useState(false);
  const [pullRequests, setPullRequests] = useState([]);

  const filteredPullRequests = pullRequests.filter((pr) => {
    const key = pr.title.trim().split(':')[0];

    const keyRegExp = new RegExp(JIRA_PROJECT_KEY + '-\\d+');

    return key.match(keyRegExp) !== null;
  });

  const getPullRequests = async () => {
    try {
      const response = await getGithubRepositoryPullRequests(
        token,
        owner,
        repositoryName
      );
      const data = response.data;

      if (data) {
        setPullRequests(response.data);
      }
    } catch (error) {
      console.error({ error }, 'Failed to get repository pull requests');
    } finally {
      setIsGithubRepositoryPullRequestsLoading(false);
    }
  };

  useEffect(() => {
    setIsGithubRepositoryPullRequestsLoading(true);

    getPullRequests();
  }, []);

  return (
    <>
      {isGithubRepositoryPullRequestsLoading ? (
        <Text>
          <Inline>
            <Spinner size="small" />
            Loading...
          </Inline>
        </Text>
      ) : (
        <List type="unordered">
          {filteredPullRequests.length === 0 && (
            <ListItem>No opened pull requests</ListItem>
          )}
          {filteredPullRequests.map((pr) => (
            <Text key={pr.id}>
              {pr.title} -{' '}
              <Link href={pr.html_url} openNewTab>
                See
              </Link>
            </Text>
          ))}
        </List>
      )}
    </>
  );
};
