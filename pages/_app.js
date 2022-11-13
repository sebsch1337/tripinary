import GlobalStyle from "../components/GlobalStyle";
import GlobalHead from "../components/GlobalHead";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <GlobalStyle />
      <GlobalHead />
      <NextNProgress color="#316bff" />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
