import React, { useEffect, useState } from "react";
import Select from "react-select";

/** react-select's own defaults, pinned so they cannot be inherited away. */
const TEXT = "hsl(0, 0%, 20%)";
const MUTED = "hsl(0, 0%, 50%)";

export type PackageSelectorOption<T> = {
  label: string;
  value: T;
};

const PackageGenericSelector = <T extends unknown>({
  label,
  options,
  onSelect,
  className = "",
  disabled = false,
  ...rest
}: {
  label: string;
  options: PackageSelectorOption<T>[];
  onSelect: (value: T) => void;
  className?: string;
  disabled?: boolean;
}) => {
  // Portal target has to wait for the DOM; SSR has no `document`.
  const [portal, setPortal] = useState<HTMLElement | null>(null);
  useEffect(() => setPortal(document.body), []);

  return (
    <div className="flex w-44 flex-col space-y-1 text-sm dark:text-black">
      {label && (
        <label className="text-xs uppercase tracking-wide opacity-70 dark:text-white">
          {label}
        </label>
      )}
      <Select
        options={options}
        onChange={(newValue: PackageSelectorOption<T>) => {
          onSelect(newValue.value);
        }}
        isDisabled={disabled}
        menuPortalTarget={portal}
        styles={{
          menuPortal: (base: any) => ({ ...base, zIndex: 10003 }),
          control: (base: any) => ({ ...base, minHeight: 34, color: TEXT }),
          // The menu is portaled to <body>, and globals.css paints body white
          // under `prefers-color-scheme: dark`. Nothing in the portal is under
          // the wrapper's `dark:text-black`, so every text colour is pinned here
          // rather than inherited -- otherwise the options render white on white.
          menu: (base: any) => ({ ...base, color: TEXT }),
          menuList: (base: any) => ({ ...base, color: TEXT }),
          option: (base: any, state: any) => ({
            ...base,
            color: state.isSelected ? "#fff" : TEXT,
          }),
          singleValue: (base: any) => ({ ...base, color: TEXT }),
          input: (base: any) => ({ ...base, color: TEXT }),
          placeholder: (base: any) => ({ ...base, color: MUTED }),
        }}
        {...rest}
      />
    </div>
  );
};

export default PackageGenericSelector;
