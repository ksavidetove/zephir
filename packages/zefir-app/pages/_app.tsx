import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import { ApolloProvider } from "@apollo/client";
import client from "./api/apollo-client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp
