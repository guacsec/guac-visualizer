import React from "react";
import Image from "next/image";

type TooltipProps = {
  style: React.CSSProperties;
  content: JSX.Element[];
  plainText: string;
  onClose: () => void;
  onCopy: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Tooltip: React.FC<TooltipProps> = ({
  style,
  content,
  onClose,
  onCopy,
}) => {
  return (
    <div
      className="absolute font-mono p-2 rounded text-sm shadow-lg border-2 border-black overflow-auto flex items-center justify-center bg-white text-gray-900 list-none"
      style={{
        ...style,
        width: "400px",
        height: "300px",
        zIndex: 10000,
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-1 top-1 flex items-center justify-center bg-red-400 hover:bg-red-500 p-2 text-white w-8 h-8"
      >
        <Image
          className="dark:white-filter transition-all duration-500"
          src="images/icons/close-button.svg"
          alt="copy to clipboard"
          width={27}
          height={27}
        />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onCopy(e);
        }}
        className="absolute right-10 top-1 flex items-center justify-center hover:bg-gray-400 bg-gray-200 p-2 text-white w-8 h-8"
      >
        <Image
          className="dark:white-filter transition-all duration-500"
          src="images/icons/copy-clipboard.svg"
          alt="copy to clipboard"
          width={27}
          height={27}
        />
      </button>
      <div className="pt-3">{content}</div>
    </div>
  );
};

export default Tooltip;
