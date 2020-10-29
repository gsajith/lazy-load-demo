import 'lazysizes';
import 'lazysizes/plugins/blur-up/ls.blur-up';
import React, { useState } from 'react';
import styled from 'styled-components';
import Flex from '../styled-components/Flex';
import ImageIcon from '../styled-components/ImageIcon';
import ImageMessage from '../styled-components/ImageMessage';
import LoadingSpinner from '../styled-components/LoadingSpinner';

const PlaceholderDiv = styled(Flex)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  align-items: center;
  color: blue;
`;

const OptimizedImage = ({ src, optimizationData }) => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <PlaceholderDiv>
        <ImageIcon src={'/app_icon_placeholder.svg'} />
        <ImageMessage>Lazysizes load here.</ImageMessage>
      </PlaceholderDiv>

      {/* Styles for this stored in globals.css */}
      {src && (
        <img
          data-lowsrc={optimizationData.smallerImageData}
          className="lazyload mediabox-img"
          data-src={src}
          onLoad={() => setLoading(false)}
          style={{
            zIndex: 1,
            opacity: loading ? 0 : 1,
          }}
        />
      )}
      {src && optimizationData && loading && (
        <LoadingSpinner
          size={'32px'}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            zIndex: 3,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    </>
  );
};

export default OptimizedImage;
