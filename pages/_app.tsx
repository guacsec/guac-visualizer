import { GuacVizThemeContextProvider } from "@/store/themeContext";
import MainLayout from "@/components/layout/mainLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <GuacVizThemeContextProvider>
      <MainLayout>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </MainLayout>
    </GuacVizThemeContextProvider>
  );
}

export default MyApp;
