import GlobalStyle from "../components/GlobalStyle";
import { SessionProvider } from "next-auth/react";
import GlobalHead from "../components/GlobalHead";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <GlobalStyle />
      <GlobalHead />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
