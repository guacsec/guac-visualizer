// TODO (mlieberman85): Most of this is based on examples from: 
// https://github.com/vercel/next.js/blob/canary/examples/with-apollo-neo4j-graphql/apollo/client.ts
// Unclear currently if this is a good way to do this.

import { useMemo } from 'react'
import { ApolloClient, InMemoryCache, createHttpLink, NormalizedCacheObject } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import merge from 'deepmerge'

let apolloClient: ApolloClient<NormalizedCacheObject>

// function createIsomorphLink() {
//   if (typeof window === 'undefined') {
//     const schema = require('./schema')
//     return new SchemaLink({ schema })
//   } else {
//     return createHttpLink({
//       uri: "http://localhost",
//     })
//   }
// }

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    // link: createIsomorphLink(),
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
  })
}

const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    // link: createIsomorphLink(),
    uri: "http://localhost:3000/api/graphql",
    credentials: "same-origin",
    cache: new InMemoryCache(),
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