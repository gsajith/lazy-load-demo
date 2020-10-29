import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Button from './components/Button';
import DefaultImage from './components/DefaultImage';
import OptimizedImage from './components/OptimizedImage';
import StoredState from './components/StoredState';
import TextInput from './components/TextInput';
import Flex from './styled-components/Flex';
import Wrapper from './styled-components/Wrapper';
import {
  clearFromLocalStorage,
  isValidUrl,
  loadFromLocalStorage,
  processResponse,
  setToLocalStorage,
} from './util/util';

const IMAGE_KEY = 'imageUrl';

export default function Home() {
  const [url, setUrl] = useState('');
  const [processedUrl, setProcessedUrl] = useState(null);
  const [fetchingUrl, setFetchingUrl] = useState(false);
  const [urlError, setUrlError] = useState('');
  const [defaultImgSrc, setDefaultImgSrc] = useState(null);
  const [optimizationData, setOptimizationData] = useState(null);

  useEffect(() => {
    setDefaultImgSrc(loadFromLocalStorage(IMAGE_KEY, null));
    setUrl(loadFromLocalStorage(IMAGE_KEY, ''));
    setProcessedUrl(loadFromLocalStorage(IMAGE_KEY, null));
  }, []);

  const fetchImage = () => {
    if (!isValidUrl(url)) {
      setUrlError('URL must be: JPG, PNG, GIF');
    } else {
      doFetch();
    }
  };

  const doFetch = () => {
    setFetchingUrl(true);
    clearFromLocalStorage(IMAGE_KEY);
    setDefaultImgSrc(null);
    setTimeout(() => {
      // TODO: progress bar
      axios
        .get(url)
        .then((response) => {
          const result = processResponse(response);
          setOptimizationData(result);
          setFetchingUrl(false);
          setToLocalStorage(IMAGE_KEY, url);
          setProcessedUrl(url);
        })
        .catch((error) => {
          setFetchingUrl(false);
          setUrlError('Error fetching URL');
          console.log(error);
        });
    }, 3000);
  };

  const handleUrlChange = (e) => {
    setUrlError('');
    setUrl(e.target.value);
  };

  return (
    <Wrapper>
      <Head>
        <title>Lazy Loading Images</title>
        <link rel="icon" href="/favicon.ico" />
        <meta http-equiv="cache-control" content="no-cache" />
        <meta http-equiv="expires" content="0" />
        <meta http-equiv="pragma" content="no-cache" />
      </Head>
      <Flex row>
        <TextInput
          style={{ marginRight: 8, minWidth: 200 }}
          value={url}
          onChange={handleUrlChange}
          error={urlError}
          placeholder="Enter image URL"
        />
        <Button loading={fetchingUrl} onClick={fetchImage}>
          <StoredState url1={processedUrl} url2={url} />
        </Button>
      </Flex>
      {url === processedUrl && (
        <div style={{ marginTop: 8 }}>Ready to render. Do a hard-refresh.</div>
      )}
      <Flex row style={{ marginTop: 16 }}>
        <DefaultImage src={defaultImgSrc} />
        <OptimizedImage
          src={defaultImgSrc}
          optimizationData={optimizationData}
        />
      </Flex>
    </Wrapper>
  );
}
