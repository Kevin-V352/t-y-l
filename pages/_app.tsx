import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { defaultTheme } from '@/themes';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {

  return (
    <ThemeProvider theme={defaultTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );

};

export default appWithTranslation(MyApp);
