import React from 'react';
import ImageStage from '../styled-components/ImageStage';

const DefaultImage = ({ src }) => {
  return (
    <ImageStage>
      <img src={src} />
    </ImageStage>
  );
};

export default DefaultImage;
