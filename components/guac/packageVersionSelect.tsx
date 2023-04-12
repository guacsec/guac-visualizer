import React, { useEffect } from "react";
import Select from "react-select";

const PackageVersionSelect = ({ label, options, setPackageVersionFunc, ...rest }) => {

  const onSelectPackageVersion = (event: {value: any; }) => {
    setPackageVersionFunc(event.value);
    console.log("updated version to "+event.value);
  }

  return (
    <div>
      {label && <label>{label}</label>}
      <Select options={options} onChange={(e)=>onSelectPackageVersion(e)} {...rest} />
    </div>
  );
};

export default PackageVersionSelect;
