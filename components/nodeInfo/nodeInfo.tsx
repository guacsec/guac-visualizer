import React from "react";
import KnownInfo from "../known/knownInfo";

const NodeInfo = () => {
  return (
    <div className="bg-gray-200 mx-10 p-10 h-[550px] w-[600px] overflow-y-auto flex flex-col items-center text-slate-900">
      <h1 className="font-bold text-lg">Package Information</h1>
      <p className="text-sm mb-1">Fetch more information about this package</p>
      <KnownInfo />
    </div>
  );
};

export default NodeInfo;
