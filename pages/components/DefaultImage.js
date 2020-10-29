import React from 'react';
import styled from 'styled-components';
import Flex from '../styled-components/Flex';
import ImageIcon from '../styled-components/ImageIcon';
import ImageMessage from '../styled-components/ImageMessage';

const PlaceholderDiv = styled(Flex)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  align-items: center;
`;

/**
 * Show an image with default loading, no optimizations.
 * @param {URL} src Src url to load for this image
 */
const DefaultImage = ({ src }) => {
  return (
    <>
      <PlaceholderDiv>
        <ImageIcon src={'/image_placeholder.svg'} style={{ opacity: 0.2 }} />
        <ImageMessage>Default loaded image here.</ImageMessage>
      </PlaceholderDiv>
      {src && (
        <img
          src={src}
          style={{
            position: 'absolute',
            zIndex: 1,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    </>
  );
};

export default DefaultImage;
