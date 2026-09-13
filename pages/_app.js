import Head from 'next/head';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-stack',
  display: 'swap',
});

export default function App({ Component, pageProps }) {
  return (
    <div className="grain">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
          --font-serif: ${serif.style.fontFamily};
          --font-mono-stack: ${mono.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </div>
  );
}
