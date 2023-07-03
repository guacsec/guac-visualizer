import React from "react";

interface DropdownWrapperProps {
  children: React.ReactNode;
}

const DropdownWrapper: React.FC<DropdownWrapperProps> = ({ children }) => (
  <div className="left-0 dark:text-white flex w-full items-end justify-center lg:static lg:h-auto lg:w-auto lg:bg-none">
    {children}
  </div>
);

export default DropdownWrapper;
