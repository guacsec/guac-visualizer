import React from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

interface BreadcrumbProps {
  breadcrumb: string[];
  handleNodeClick: (nodeIndex: number) => void;
  currentIndex: number;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  breadcrumb,
  handleNodeClick,
  currentIndex,
}) => {
  if (breadcrumb.length === 0) {
    return null;
  }

  return (
    <div className="flex overflow-x-auto border-b border-black/10 dark:border-white/10 px-4 py-1.5" aria-label="Breadcrumb">
      <ol
        role="list"
        className="flex flex-nowrap items-center space-x-1"
      >
        {breadcrumb.map((label, index) => {
          const maxLabelLength = 25;
          let truncatedLabel =
            label.length > maxLabelLength
              ? `${label.substr(0, maxLabelLength)}...`
              : label;

          const isActive = index === currentIndex;

          return (
            <li key={index} className="flex items-center">
              {index !== 0 && (
                <ChevronDoubleRightIcon className="w-3.5 shrink-0 opacity-30" />
              )}
              <button
                onClick={() => handleNodeClick(index)}
                className={`flex items-center p-1 m-1 ${
                  isActive
                    ? "rounded bg-black/10 dark:bg-white/15 font-semibold"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <span className="whitespace-nowrap text-xs font-medium">{truncatedLabel}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
