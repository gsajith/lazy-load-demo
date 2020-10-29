import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import URLInput from './components/URLInput';
import Wrapper from './styled-components/Wrapper';
import { isValidUrl, loadFromLocalStorage } from './util/util';
import axios from 'axios';
import DefaultImage from './components/DefaultImage';
import Flex from './styled-components/Flex';
import Button from './components/Button';

export default function Home() {
  const [url, setUrl] = useState(loadFromLocalStorage('imageUrl', ''));
  const [readyToRender, setReadyToRender] = useState(false);
  const [fetchingUrl, setFetchingUrl] = useState(false);
  const [defaultImgSrc, setDefaultImgSrc] = useState(null);
  const [urlError, setUrlError] = useState('');
  const firstLoad = useRef(false);

  const fetchImage = () => {
    if (!isValidUrl(url)) {
      setUrlError('URL must be: JPG, PNG, GIF');
    } else {
      localStorage.setItem('imageUrl', url);
      doFetch();
    }
  };

  const doFetch = () => {
    setReadyToRender(false);
    setFetchingUrl(true);
    setTimeout(() => {
      // TODO: progress bar
      axios
        .get(url)
        .then((response) => {
          setReadyToRender(true);
          setFetchingUrl(false);
        })
        .catch((error) => {
          setFetchingUrl(false);
          setUrlError('Error fetching URL');
          console.log(error);
        });
    }, 3000);
  };

  const doRender = () => {
    console.log('render');
  };

  useEffect(() => {
    if (!firstLoad.current) {
      firstLoad.current = true;
      if (isValidUrl(url)) {
        doFetch();
      }
    }
  }, [url]);

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
      <Flex>
        <URLInput
          url={url}
          setUrl={url}
          handleUrlChange={handleUrlChange}
          fetchImage={fetchImage}
          urlError={urlError}
          loading={fetchingUrl}
        />
        <Button
          disabled={!readyToRender}
          onClick={readyToRender ? doRender : () => {}}
          style={{ marginTop: 8 }}
        >
          Render images
        </Button>
      </Flex>
      <Flex row>
        <DefaultImage src={defaultImgSrc} />
        <DefaultImage />
      </Flex>
    </Wrapper>
  );
}
