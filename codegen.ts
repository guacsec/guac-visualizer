
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // TODO (mlieberman85): Below should change to some API endpoint with the schema or to soem place to download the schema.
  // For now this is just the relative path to my local clone of guac.
  schema: [
     '../guac/pkg/assembler/graphql/**/*.graphql',
     '../guac/pkg/assembler/graphql/examples/*.gql',
  ],

  documents: ['gql/**/*.tsx', '../guac/pkg/assembler/graphql/examples/*.gql'],
  generates: {
    './gql/__generated__/': {
      preset: 'client',
      plugins: [
        "typescript-react-apollo",
        "typescript-operations",
      ],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;
