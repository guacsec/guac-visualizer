
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // TODO (mlieberman85): Below should change to some API endpoint with the schema or to soem place to download the schema.
  // For now this is just the relative path to my local clone of guac.
  schema: [
     '../guac/pkg/assembler/graphql/schema/*.graphql',
  ],
  documents: ['../guac/pkg/assembler/clients/operations/*.graphql'],
  generates: {
    './gql/__generated__/': {
      preset: 'client',
      plugins: [
      ],
      presetConfig: {
        gqlTagName: 'gql',
      },
    }
  },
};

export default config;
