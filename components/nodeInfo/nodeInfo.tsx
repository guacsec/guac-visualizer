import React from "react";
import KnownInfo from "../known/knownInfo";

const NodeInfo = () => {
  return (
    <div className="flex flex-col p-4">
      <h2 className="font-semibold uppercase tracking-wide text-xs opacity-70">Package details</h2>
      <p className="pb-3 text-xs opacity-60 leading-snug">Known vulnerabilities, SBOMs and attestations for the selected package.</p>
      <KnownInfo />
    </div>
  );
};

export default NodeInfo;
