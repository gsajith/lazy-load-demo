import { decode } from 'blurhash';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Flex from '../styled-components/Flex';
import ImageIcon from '../styled-components/ImageIcon';
import ImageMessage from '../styled-components/ImageMessage';
import LoadingSpinner from '../styled-components/LoadingSpinner';
import 'lazysizes';

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
  const canvasRef = useRef(null);
  const [opacity, setOpacity] = useState(0);

  const onImageLoad = () => {
    setOpacity(1);
  };

  return (
    <>
      <PlaceholderDiv>
        <ImageIcon src={'/app_icon_placeholder.svg'} />
        <ImageMessage>Lazysizes load here.</ImageMessage>
      </PlaceholderDiv>
      <img
        src="https://images.unsplash.com/photo-1603850609984-ed9991df522f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=50&q=80"
        className="lazyload"
        data-src={src}
        onLoad={onImageLoad}
        style={{
          position: 'absolute',
          zIndex: 1,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 300ms ease-in',
          opacity: opacity,
        }}
      />
    </>
  );
};

export default OptimizedImage;
