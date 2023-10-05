import { useState, useEffect } from "react";
import { debounce } from "lodash";

export function useDimensions() {
  const [dimensions, setDimensions] = useState({ width: 3000, height: 1000 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = debounce(() => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 300);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let containerWidth = dimensions.width * 0.5;
  let containerHeight = dimensions.height * 0.6;

  if (dimensions.width <= 640) {
    containerWidth = dimensions.width * 0.9;
    containerHeight = dimensions.height * 0.5;
  }

  return { containerWidth, containerHeight };
}
