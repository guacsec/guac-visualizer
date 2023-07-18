// NavigationButtons.tsx
import React from "react";

interface NavigationButtonsProps {
  backStack: any[];
  forwardStack: any[];
  breadcrumb: any[];
  handleBackClick: () => void;
  handleForwardClick: () => void;
  reset: () => void;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  backStack,
  forwardStack,
  breadcrumb,
  handleBackClick,
  handleForwardClick,
  reset,
}) => {
  return (
    <div className="py-10 my-5 flex space-x-3">
      <button
        type="button"
        className={`rounded px-3 py-2 text-xs font-semibold shadow-sm ${
          backStack.length === 0
            ? "bg-gray-300 dark:bg-slate-700 cursor-not-allowed"
            : "bg-slate-700 text-white"
        }`}
        title="Go back to previous visualization"
        onClick={handleBackClick}
        disabled={backStack.length === 0}
      >
        Back
      </button>
      <button
        type="button"
        className={`rounded px-3 py-2 text-xs font-semibold shadow-sm ${
          forwardStack.length === 0
            ? "bg-gray-300 dark:bg-slate-700 cursor-not-allowed"
            : "bg-slate-700 text-white"
        }`}
        title="Go forward to next visualization"
        onClick={handleForwardClick}
        disabled={forwardStack.length === 0}
      >
        Forward
      </button>
      <button
        type="button"
        className={`rounded px-3 py-2 text-xs font-semibold shadow-sm ${
          breadcrumb.length === 0
            ? "bg-gray-300 dark:bg-slate-700 cursor-not-allowed"
            : "bg-slate-700 text-white"
        }`}
        title="Reset visualization"
        onClick={reset}
        disabled={breadcrumb.length === 0}
      >
        Reset
      </button>
    </div>
  );
};
