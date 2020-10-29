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

  const smallImageWidth = Math.min(40, Math.floor(imageData.width / 10));
  let smallImageHeight;
  if (smallImageWidth === 40) {
    smallImageHeight = (40 / imageData.width) * imageData.height;
  } else {
    smallImageHeight = Math.floor(imageData.height) / 10;
  }

  const smallerImage = imageToDataUri(image, smallImageWidth, smallImageHeight);
  return {
    blurhash: encode(imageData.data, imageData.width, imageData.height, 4, 4),
    width: imageData.width,
    height: imageData.height,
    smallerImageData: smallerImage,
  };
};

export const processResponse = async (response, imageUrl) => {
  let blurhashData = await encodeImageToBlurhash(imageUrl);
  return { ...blurhashData };
};

// Resize an image with base64? Hopefully?
function imageToDataUri(img, width, height) {
  // create an off-screen canvas
  var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

  // set its dimension to target size
  canvas.width = width;
  canvas.height = height;

  // draw source image into the off-screen canvas:
  ctx.drawImage(img, 0, 0, width, height);

  // encode image to data-uri with base64 version of compressed image
  return canvas.toDataURL();
}
