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
  if (breadcrumb.length === 0) {
    return null;
  }

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol
        role="list"
        className="flex flex-wrap space-x-4 rounded-xl bg-white mt-10 px-6 py-2 shadow"
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
                  <ChevronDoubleRightIcon
                    className="w-8"
                    style={{ color: "rgba(90, 75, 60, 0.3)" }}
                  />
                )}
                <div className="text-gray-500">
                  <span className="ml-2 text-sm font-medium">
                    {truncatedLabel}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
