import { useState } from "react";

export const Toggle = ({
  label,
  toggled,
  onClick,
}: {
  label: string;
  toggled: boolean;
  onClick: (toggled: boolean) => void;
}) => {
  const [isToggled, toggle] = useState(toggled);

  const callback = () => {
    toggle(!isToggled);
    onClick(!isToggled);
  };

  return (
    <label>
      <strong className="toggle_label">{label}</strong>
      <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
      <span className="toggle_span" />
    </label>
  );
};
