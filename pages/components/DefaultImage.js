import React from 'react';
import styled from 'styled-components';
import Flex from '../styled-components/Flex';
import ImageIcon from '../styled-components/ImageIcon';
import ImageMessage from '../styled-components/ImageMessage';
import ImageStage from '../styled-components/ImageStage';

const PlaceholderDiv = styled(Flex)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  align-items: center;
`;

const DefaultImage = ({ src }) => {
  return (
    <ImageStage>
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
    </ImageStage>
  );
};

export default DefaultImage;