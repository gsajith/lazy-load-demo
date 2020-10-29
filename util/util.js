import { encode } from 'blurhash';

export const isValidUrl = (url) => {
  return true;
  // return url.match(/\.(jpeg|jpg|gif|bmp|apng|png)$/) != null;
};

export const isSSR = () => {
  return typeof window === 'undefined';
};

export const loadFromLocalStorage = (key, defaultValue) => {
  if (isSSR()) {
    return defaultValue;
  }
  if (localStorage.getItem(key)) {
    return localStorage.getItem(key);
  } else {
    return defaultValue;
  }
};

export const setToLocalStorage = (key, value) => {
  if (isSSR()) {
    return;
  }

  localStorage.setItem(key, value);
};

export const clearFromLocalStorage = (key) => {
  if (isSSR()) {
    return;
  }

  localStorage.removeItem(key);
};

const loadImage = async (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
    img.src = src;
  });

const getImageData = (image) => {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);
  return context.getImageData(0, 0, image.width, image.height);
};

const encodeImageToBlurhash = async (imageUrl) => {
  const image = await loadImage(imageUrl);
  const imageData = getImageData(image);
  return {
    blurhash: encode(imageData.data, imageData.width, imageData.height, 4, 4),
    width: imageData.width,
    height: imageData.height,
  };
};

export const processResponse = async (response, imageUrl) => {
  let blurhashData = await encodeImageToBlurhash(imageUrl);
  return { ...blurhashData };
};
