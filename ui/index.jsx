import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, Inline, Spinner } from '@forge/react';
import { Token } from './components/Token';
import { GITHUB_API_TOKEN_STORAGE_KEY } from './constants';
import { getStorageData } from './services';

const App = () => {
  const [isGithubTokenLoading, setIsGithubTokenLoading] = useState(false);
  const [githubToken, setGithubToken] = useState(null);

  const getGithubToken = async () => {
    try {
      const response = await getStorageData(GITHUB_API_TOKEN_STORAGE_KEY);
      const token = response.data || null;

      setGithubToken(token);
    } catch (error) {
      console.error({ error }, 'Failed to get token');
    } finally {
      setIsGithubTokenLoading(false);
    }
  };

  const handleSetGithubToken = (token) => {
    setGithubToken(token);
  };

  useEffect(() => {
    setIsGithubTokenLoading(true);

    getGithubToken();
  }, []);

  return (
    <>
      <Text>Hello world!</Text>
      {isGithubTokenLoading && (
        <Text>
          <Inline>
            <Spinner size="small" />
            Loading...
          </Inline>
        </Text>
      )}
      {isGithubTokenLoading ? null : (
        <Token token={githubToken} handleSetToken={handleSetGithubToken} />
      )}
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
