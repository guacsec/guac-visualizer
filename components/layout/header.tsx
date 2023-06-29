import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { MoonIcon, SunIcon, Bars3Icon } from "@heroicons/react/24/solid";
import GuacVizThemeContext from "@/store/themeContext";
import NavigationLinks from "./navlinks";

export default function Header() {
  const { isDarkTheme, toggleThemeHandler } = useContext(GuacVizThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // reverts hamburger menu back to normal menu when screen resizes
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="flex justify-between bg-stone-200 font-mono dark:bg-stone-800 text-zinc-600 px-2 md:px-20 items-center backdrop-blur-sm w-full py-4">
        <div>
          <a
            className="flex items-center"
            href="https://github.com/guacsec/guac-visualizer"
            target="blank"
          >
            <Image
              className="dark:white-filter"
              src="images/icons/guac-logo.svg"
              alt="GUAC Logo"
              width={27}
              height={27}
            />
            <h1 className="sm:text-2xl ml-2 dark:text-stone-300">
              GUAC Visualizer
            </h1>
          </a>
        </div>
        <div className="hidden md:flex w-1/2 flex-wrap justify-between items-center">
          <NavigationLinks />
          <button type="button" onClick={toggleThemeHandler}>
            {isDarkTheme ? (
              <SunIcon className="h-8 w-8 text-stone-300" />
            ) : (
              <MoonIcon className="h-8 w-8 text-zinc-600" />
            )}
          </button>
        </div>
        <div className="md:hidden">
          <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Bars3Icon className="h-8 w-8 text-zinc-600" />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="flex flex-col items-end z-50 bg-stone-200 font-mono dark:bg-stone-800 text-zinc-600">
          <NavigationLinks />
        </div>
      )}
    </>
  );
}
