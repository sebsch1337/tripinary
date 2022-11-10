import GlobalStyle from "../components/GlobalStyle";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <GlobalStyle />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
