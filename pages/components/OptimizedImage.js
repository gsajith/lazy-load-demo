import { decode } from 'blurhash';
import React, { useEffect, useRef, useState } from 'react';
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
  const canvasRef = useRef(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (optimizationData) {
      const { blurhash } = optimizationData;
      if (canvasRef.current) {
        let canvas = canvasRef.current;
        const pixels = decode(blurhash, canvas.width, canvas.height);
        const imageData = new ImageData(pixels, canvas.width, canvas.height);
        let context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.putImageData(imageData, 0, 0);
      }
    }
  }, [optimizationData]);

  const onImageLoad = () => {
    setOpacity(1);
  };

  return (
    <>
      <PlaceholderDiv>
        <ImageIcon src={'/app_icon_placeholder.svg'} />
        <ImageMessage>Lazy-loaded here.</ImageMessage>
      </PlaceholderDiv>
      <canvas
        ref={canvasRef}
        width={optimizationData ? optimizationData.width : 0}
        height={optimizationData ? optimizationData.height : 0}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          objectFit: 'contain',
        }}
      />
      {optimizationData && (
        <LoadingSpinner
          size={'32px'}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
      {src && (
        <img
          src={src}
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
      )}
    </>
  );
};

export default OptimizedImage;
