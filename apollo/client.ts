import { useMemo } from 'react'
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import merge from 'deepmerge'

let apolloClient: ApolloClient<NormalizedCacheObject>

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    // link: createIsomorphLink(),
    uri: "/api/graphql",
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
      },
      query: {
        fetchPolicy: 'no-cache',
      }
    }
  })
}

const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    // link: createIsomorphLink(),
    uri: "/api/graphql",
    credentials: "same-origin",
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
      },
      query: {
        fetchPolicy: 'no-cache',
      }
    }
  })

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache)

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }

  if (typeof window === 'undefined') return _apolloClient

  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}

export default client