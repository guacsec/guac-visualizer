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
      className="absolute font-mono p-2 rounded text-sm shadow-lg border-2 border-black overflow-auto flex items-center justify-center bg-white text-gray-900 list-none resize"
      style={{
        ...style,
        width: "400px",
        height: "300px",
        zIndex: 10000,
        resize: "both",
        overflow: "auto",
        maxWidth: "90vw",
        maxHeight: "90vh",
      }}
    >
      <div className="relative w-full h-full">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-1 right-1 flex items-center justify-center bg-red-400 hover:bg-red-500 p-2 text-white w-8 h-8"
          aria-label="Close tooltip"
        >
          {/* close button */}
          <Image
            className="dark:white-filter transition-all duration-500"
            src="images/icons/close-button.svg"
            alt="close button"
            width={27}
            height={27}
          />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCopy(e);
          }}
          className="absolute top-1 right-10 flex items-center justify-center hover:bg-gray-400 bg-gray-200 p-2 text-white w-8 h-8"
          aria-label="Copy to clipboard"
        >
          {/* copy */}
          <Image
            className="dark:white-filter transition-all duration-500"
            src="images/icons/copy-clipboard.svg"
            alt="copy to clipboard"
            width={27}
            height={27}
          />
        </button>
        <div className="p-3 leading-loose">{content}</div>
      </div>
    </div>
  );
};

export default Tooltip;
