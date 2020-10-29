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
  color: blue;
`;

const OptimizedImage = ({ src }) => {
  return (
    <ImageStage>
      <PlaceholderDiv>
        <ImageIcon src={'/app_icon_placeholder.svg'} />
        <ImageMessage>Lazy-loaded here.</ImageMessage>
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

export default OptimizedImage;
