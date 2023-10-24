import React from "react";
import KnownInfo from "../known/knownInfo";

const NodeInfo = () => {
  return (
    <div className="bg-gray-200 mx-10 p-10 h-[550px] overflow-y-auto flex flex-col items-center">
      <h1 className="font-bold text-lg">Information</h1>
      <p className="text-sm mb-1">Fetch more information about this package</p>
      <KnownInfo />
    </div>
  );
};

export default NodeInfo;
