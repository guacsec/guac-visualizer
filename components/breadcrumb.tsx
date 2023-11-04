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
    <div className="flex mt-3 py-5" aria-label="Breadcrumb">
      <ol
        role="list"
        className="flex flex-wrap space-x-2 rounded-xl bg-white px-6 shadow"
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
                <ChevronDoubleRightIcon className="w-5 mx-0.5 text-[rgba(90,75,60,0.3)]" />
              )}
              <button
                onClick={() => handleNodeClick(index)}
                className={`flex items-center p-1 m-1 ${
                  isActive
                    ? "bg-gray-300 font-bold text-black rounded-lg"
                    : "text-gray-500"
                }`}
              >
                <span className="text-sm font-medium">{truncatedLabel}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
