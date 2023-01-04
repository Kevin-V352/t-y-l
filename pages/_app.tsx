import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { CartProvider } from '@/contexts';
import { defaultTheme } from '@/themes';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {

  return (
    <ThemeProvider theme={defaultTheme}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ThemeProvider>
  );

};

export default MyApp;
