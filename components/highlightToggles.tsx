import React from "react";
import { Toggle } from "@/components/packages/toggleSwitch";

interface HighlightTogglesProps {
  highlights: {
    artifact: boolean;
    vuln: boolean;
    sbom: boolean;
    builder: boolean;
  };
  setHighlights: React.Dispatch<
    React.SetStateAction<{
      artifact: boolean;
      vuln: boolean;
      sbom: boolean;
      builder: boolean;
    }>
  >;
}

export const HighlightToggles: React.FC<HighlightTogglesProps> = ({
  highlights,
  setHighlights,
}) => {
  return (
    <div className="flex flex-col justify-center gap-y-2 w-full">
      <Toggle
        label="Artifacts"
        toggled={highlights.artifact}
        onClick={() =>
          setHighlights((prev) => ({ ...prev, artifact: !prev.artifact }))
        }
      />
      <Toggle
        label="Vulnerabilities"
        toggled={highlights.vuln}
        onClick={() => setHighlights((prev) => ({ ...prev, vuln: !prev.vuln }))}
      />
      <Toggle
        label="SBOM"
        toggled={highlights.sbom}
        onClick={() => setHighlights((prev) => ({ ...prev, sbom: !prev.sbom }))}
      />
      <Toggle
        label="Builder"
        toggled={highlights.builder}
        onClick={() =>
          setHighlights((prev) => ({ ...prev, builder: !prev.builder }))
        }
      />
    </div>
  );
};
