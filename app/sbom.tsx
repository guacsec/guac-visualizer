import React, { useState } from 'react';
import { JsonViewer } from '@textea/json-viewer';

const SBOMViewer = ({onSelect}) => {
  const [sbomData, setSbomData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          console.log('Parsed JSON data:', jsonData);
          setSbomData(jsonData);
        } catch (error) {
          console.error('Error parsing JSON file:', error);
        }
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".json" onChange={handleFileUpload} />
      {sbomData && <JsonViewer value={sbomData} theme="dark" onSelect={onSelect} />}
    </div>
  );
};

export default SBOMViewer;