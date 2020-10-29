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
import Instructions from './styled-components/Instructions';
import ButtonGroup from './components/ButtonGroup';

const DefaultImage = dynamic(() => import('./components/DefaultImage'), {
  ssr: false,
});
const OptimizedImage = dynamic(() => import('./components/OptimizedImage'), {
  ssr: false,
});
const LazySizesImage = dynamic(() => import('./components/LazySizesImage'), {
  ssr: false,
});

const IMAGE_KEY = 'imageUrl';

export default function Home() {
  const [url, setUrl] = useState('');
  const [fetchingUrl, setFetchingUrl] = useState(false);
  const [urlError, setUrlError] = useState('');
  const [imgSrc, setImgSrc] = useState(null);

  // Optimization data and processed URL stored in local storage
  const [optimizationData, setOptimizationData] = createPersistedState(
    'optimizationData',
  )(null);
  const [processedUrl, setProcessedUrl] = createPersistedState('processedUrl')(
    null,
  );
  const [optimizationMode, setOptimizationMode] = createPersistedState(
    'optimizationMode',
  )('none');
  const optimizationModes = ['none', 'blurhash', 'lazysizes'];

  useEffect(() => {
    // Set processed values on first load
    setImgSrc(loadFromLocalStorage(IMAGE_KEY, null));
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
    setImgSrc(null);
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

  const handleOptimizationModeSelected = (mode) => {
    setOptimizationMode(mode);
    setImgSrc(null);
  };

  return (
    <Wrapper>
      <Head>
        <title>Optimized Loading Images</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:description"
          content="Demo of optimized-loading images with blurhash."
        />
        <meta property="og:image" content="https://i.imgur.com/OIGX4XU.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Instructions>
        <li>Type in a link you want to optimize-load and hit "Store"</li>
        <li>
          Once storing process finishes, hard-reload your page to see images
          load. (turn on Network throttling in Dev Tools to see the effect more
          clearly)
        </li>
      </Instructions>

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
        <>
          <ButtonGroup
            options={optimizationModes}
            setSelected={handleOptimizationModeSelected}
            selected={optimizationMode}
          />

          <div style={{ marginTop: 8 }}>
            Ready to render. You must do a hard-refresh to see the full load
            effect.
          </div>
        </>
      )}
      <Flex row style={{ marginTop: 16 }}>
        <ImageStage>
          {optimizationMode === 'none' && <DefaultImage src={imgSrc} />}
          {optimizationMode === 'blurhash' && (
            <OptimizedImage src={imgSrc} optimizationData={optimizationData} />
          )}
          {optimizationMode === 'lazysizes' && (
            <LazySizesImage src={imgSrc} optimizationData={optimizationData} />
          )}
        </ImageStage>
      </Flex>
    </Wrapper>
  );
}
