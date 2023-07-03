import React from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

interface BreadcrumbProps {
  breadcrumb: string[];
  handleNodeClick: (node: string) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  breadcrumb,
  handleNodeClick,
}) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol
        role="list"
        className="flex space-x-4 rounded-md bg-white dark:bg-gray-800 px-6 py-2 shadow"
      >
        {breadcrumb.map((label, index) => {
          const maxLabelLength = 15;
          let truncatedLabel = label;

          if (label.length > maxLabelLength) {
            truncatedLabel = label.substr(0, maxLabelLength) + "...";
          }

          return (
            <li className="flex" key={index}>
              <div className="flex items-center">
                {index !== 0 && (
                  <ChevronDoubleRightIcon className="w-8 text-gray-400 dark:text-white" />
                )}
                <div
                  className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                  onClick={() => handleNodeClick(label)}
                >
                  {truncatedLabel}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
