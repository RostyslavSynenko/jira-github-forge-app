import React, { useState } from 'react';
import {
  Text,
  ErrorMessage,
  Box,
  Label,
  Textfield,
  LoadingButton,
  RequiredAsterisk,
} from '@forge/react';
import { GITHUB_API_TOKEN_STORAGE_KEY } from '../constants';
import { setStorageData, deleteStorageData } from '../services';

export const Token = ({ token, handleSetToken }) => {
  const [validationError, setValidationError] = useState(null);
  const [isMutatingGithubTokenLoading, setIsMutatingGithubTokenLoading] =
    useState(false);
  const [githubTokenInput, setGithubTokenInput] = useState('');

  const handleChangeTokenInput = (event) => {
    const value = event.target.value;

    setGithubTokenInput(value);
  };

  const handleSetStorageData = async () => {
    setIsMutatingGithubTokenLoading(true);

    try {
      if (!githubTokenInput) {
        setValidationError('Token cannot be empty!');
      } else {
        setValidationError(null);

        await setStorageData(GITHUB_API_TOKEN_STORAGE_KEY, githubTokenInput);

        handleSetToken(githubTokenInput);
        setGithubTokenInput('');
      }
    } catch (error) {
      console.error({ error }, 'Failed to save token');
    } finally {
      setIsMutatingGithubTokenLoading(false);
    }
  };

  const handleDeleteStorageData = async () => {
    setIsMutatingGithubTokenLoading(true);

    try {
      await deleteStorageData(GITHUB_API_TOKEN_STORAGE_KEY);

      handleSetToken(null);
    } catch (error) {
      console.error({ error }, 'Failed to save token');
    } finally {
      setIsMutatingGithubTokenLoading(false);
    }
  };

  if (!token) {
    return (
      <>
        <Text>No token...</Text>
        <Box xcss={{ width: '500px' }} paddingBlockStart="space.500">
          <Label labelFor="token-textfield">
            Add GitHub token <RequiredAsterisk />
          </Label>
          <Textfield
            name="token-textfield"
            onChange={handleChangeTokenInput}
            value={githubTokenInput}
          />
          {validationError && <ErrorMessage>{validationError}</ErrorMessage>}

          <LoadingButton
            onClick={handleSetStorageData}
            isLoading={isMutatingGithubTokenLoading}
          >
            Add
          </LoadingButton>
        </Box>
      </>
    );
  }

  return (
    <Box xcss={{ width: '500px' }} paddingBlockStart="space.500">
      <Text>Delete GitHub token </Text>
      <LoadingButton
        onClick={handleDeleteStorageData}
        isLoading={isMutatingGithubTokenLoading}
      >
        Delete
      </LoadingButton>
    </Box>
  );
};
