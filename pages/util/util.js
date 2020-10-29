export const isValidUrl = (url) => {
  return url.match(/\.(jpeg|jpg|gif|bmp|apng|png)$/) != null;
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

export const processResponse = (response) => {
  console.log('Processing...');
  return response.data.length;
};
