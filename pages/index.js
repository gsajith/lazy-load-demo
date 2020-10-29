import Head from 'next/head';
import TextInput from './components/TextInput';
import Wrapper from './styled-components/Wrapper';

export default function Home() {
  return (
    <Wrapper>
      <Head>
        <title>Lazy Loading Images</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Hey!</div>
      <div>Hey!</div>
      <TextInput style={{ width: 500, background: 'red' }} />
    </Wrapper>
  );
}
