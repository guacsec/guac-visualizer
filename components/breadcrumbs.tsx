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
    <nav className="flex" aria-label="Breadcrumb">
      <ol
        role="list"
        className="flex flex-wrap space-x-4 rounded-xl bg-white mt-10 px-6 shadow"
      >
        {breadcrumb.map((label, index) => {
          const maxLabelLength = 15;
          let truncatedLabel = label;

          if (label.length > maxLabelLength) {
            truncatedLabel = label.substr(0, maxLabelLength) + "...";
          }

          return (
            <li className="flex" key={index}>
              {index !== 0 && (
                <ChevronDoubleRightIcon
                  className="w-5"
                  style={{ color: "rgba(90, 75, 60, 0.3)" }}
                />
              )}
              <button
                onClick={() => handleNodeClick(index)}
                className={`flex items-center ${
                  index === currentIndex
                    ? "bg-gray-300 font-bold text-black p-1 m-2"
                    : ""
                }`}
              >
                <div className="text-gray-500">
                  <span className="text-sm font-medium">{truncatedLabel}</span>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
