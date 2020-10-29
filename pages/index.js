import axios from 'axios';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import createPersistedState from 'use-persisted-state';
import Button from './components/Button';
import StoredState from './components/StoredState';
import TextInput from './components/TextInput';
import Flex from './styled-components/Flex';
import ImageStage from './styled-components/ImageStage';
import Wrapper from './styled-components/Wrapper';
import {
  clearFromLocalStorage,
  isValidUrl,
  loadFromLocalStorage,
  processResponse,
  setToLocalStorage,
} from '../util/util';

const DefaultImage = dynamic(() => import('./components/DefaultImage'), {
  ssr: false,
});
const OptimizedImage = dynamic(() => import('./components/OptimizedImage'), {
  ssr: false,
});

const IMAGE_KEY = 'imageUrl';

export default function Home() {
  const [url, setUrl] = useState('');
  const [fetchingUrl, setFetchingUrl] = useState(false);
  const [urlError, setUrlError] = useState('');
  const [defaultImgSrc, setDefaultImgSrc] = useState(null);

  // Optimization data and processed URL stored in local storage
  const [optimizationData, setOptimizationData] = createPersistedState(
    'optimizationData',
  )(null);
  const [processedUrl, setProcessedUrl] = createPersistedState('processedUrl')(
    null,
  );

  useEffect(() => {
    // Set processed values on first load
    setDefaultImgSrc(loadFromLocalStorage(IMAGE_KEY, null));
    setUrl(loadFromLocalStorage(IMAGE_KEY, ''));
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
      axios
        .get(url, {
          responseType: 'arraybuffer',
        })
        .then((response) => {
          processResponse(response, url).then((result) => {
            if (result) {
              setOptimizationData(result);
              setProcessedUrl(url);
              setFetchingUrl(false);
              setToLocalStorage(IMAGE_KEY, url);
            }
          });
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
      </Head>
      <Flex row>
        <TextInput
          style={{ marginRight: 8 }}
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
        <ImageStage>
          <DefaultImage src={defaultImgSrc} />
        </ImageStage>
        <ImageStage>
          <OptimizedImage
            src={defaultImgSrc}
            optimizationData={optimizationData}
          />
        </ImageStage>
      </Flex>
    </Wrapper>
  );
}
