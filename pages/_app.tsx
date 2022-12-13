import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ThemeProvider } from "@mui/material";
import { theme } from "../utils/theme";
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { SessionProvider } from "next-auth/react"
const clientSideEmotionCache = createEmotionCache();
function MyApp({ Component, pageProps: { session, ...pageProps }, emotionCache = clientSideEmotionCache, }) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;