import React from 'react';
import { ListItem, Link } from '@forge/react';
import { PullRequestList } from './PullRequestList';

export const RepositoryItem = ({ token, repository }) => {
  return (
    <ListItem>
      <Link href={repository.html_url}>{repository.name}</Link>
      <PullRequestList
        token={token}
        owner={repository.owner.login}
        repositoryName={repository.name}
      />
    </ListItem>
  );
};
