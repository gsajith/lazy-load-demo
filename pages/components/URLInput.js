import React from 'react';
import Button from './Button';
import Flex from '../styled-components/Flex';
import TextInput from './TextInput';

const URLInput = ({ url, handleUrlChange, fetchImage, urlError, loading }) => {
  return (
    <Flex row>
      <TextInput
        style={{ marginRight: 8, minWidth: 200 }}
        value={url}
        onChange={handleUrlChange}
        error={urlError}
        placeholder="Enter image URL"
      />
      <Button loading={loading} onClick={fetchImage}>
        Load
      </Button>
    </Flex>
  );
};

export default URLInput;
