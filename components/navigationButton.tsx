import React from "react";

interface NavigationButtonsProps {
  backStack: any[];
  breadcrumb: any[];
  currentIndex: number;
  handleBackClick: () => void;
  handleForwardClick: () => void;
  reset: () => void;
  userInteractedWithPath: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  backStack,
  breadcrumb,
  currentIndex,
  handleBackClick,
  handleForwardClick,
  reset,
  userInteractedWithPath,
}) => {
  return (
    <div className=" mt-10 flex space-x-3">
      <button
        type="button"
        className={`rounded px-3 py-2 text-xs font-semibold shadow-sm ${
          backStack.length === 0
            ? "bg-gray-300 dark:bg-slate-700 cursor-not-allowed"
            : "bg-slate-700 text-white"
        }`}
        title="Go back to previous visualization"
        onClick={handleBackClick}
        disabled={!userInteractedWithPath || backStack.length === 0}
      >
        Back
      </button>
      <button
        type="button"
        className={`rounded px-3 py-2 text-xs font-semibold shadow-sm ${
          breadcrumb.length === 0 || currentIndex >= breadcrumb.length - 1
            ? "bg-gray-300 dark:bg-slate-700 cursor-not-allowed"
            : "bg-slate-700 text-white"
        }`}
        title="Go forward to next visualization"
        onClick={handleForwardClick}
        disabled={
          !userInteractedWithPath ||
          breadcrumb.length === 0 ||
          currentIndex >= breadcrumb.length - 1
        }
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
