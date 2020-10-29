import React from 'react';
import Flex from '../styled-components/Flex';

const StoredState = ({ url1, url2 }) => {
  return (
    <>
      {url1 === url2 ? (
        <Flex row alignItems="center" justifyContent="center">
          STORED{' '}
          <img
            src="/check.svg"
            style={{ width: 18, marginLeft: 6, fill: 'white' }}
          />
        </Flex>
      ) : (
        'STORE'
      )}
    </>
  );
};

export default StoredState;
