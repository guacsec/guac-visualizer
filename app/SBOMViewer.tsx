import React, { useState } from 'react';
import { JsonViewer } from '@textea/json-viewer';
import { useApolloClient } from '@apollo/client';
import { TEST_QUERY } from './graphql/queries';



export default function SBOMViewer({ initialSBOMData }) {
    const [sbomData, setSbomData] = useState(initialSBOMData);
    const apolloClient = useApolloClient();
  
    const handleJsonViewerClick = async (key, value) => {
      if (key === 'name') {
        const { data } = await apolloClient.query({
          query: TEST_QUERY,
          variables: {
            isDependencySpec: { package: { name: value } },
          },
        });
  
        setSbomData(data);
      }
    };
  
    return (
      <div>
        <JsonViewer
          value={sbomData}
          theme="dark"
          onClick={handleJsonViewerClick}
        />
      </div>
    );
  }