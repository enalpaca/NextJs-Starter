import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from "@mui/material";
import { theme } from "../utils/theme";
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { SessionProvider } from "next-auth/react"
import { auth } from '@src/firebase/firebaseConfigs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
const clientSideEmotionCache = createEmotionCache();
function MyApp({ Component, pageProps: { session, ...pageProps }, emotionCache = clientSideEmotionCache, }: any) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <SessionProvider session={session}>
          {
            Component.auth ? <Auth authOptions={Component.auth}>
              <Component {...pageProps}></Component>
            </Auth> : <Component {...pageProps}></Component>
          }
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

const Auth = ({ children, authOptions }: any) => {

  const router = useRouter();
  const [user, setUser] = useState(() => auth.currentUser);
  if (authOptions && authOptions.required) {
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
          if (authOptions.redirect) {
            router.push(authOptions.redirect)
          } else {
            router.push('/login')
          }
        }

      });
    }, []);
  }

  if (!user) {
    return null
  }

  return children
}
export default MyApp;