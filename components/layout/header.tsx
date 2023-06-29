import { useContext } from "react";
import Image from "next/image";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import GuacVizThemeContext from "@/store/themeContext";

export default function Header() {
  const { isDarkTheme, toggleThemeHandler } = useContext(GuacVizThemeContext);

  return (
    <>
      <div className="flex justify-between bg-stone-200 dark:bg-stone-800 px-2 md:px-20 items-center backdrop-blur-sm w-full py-4">
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
            <h1 className="text-zinc-600 font-mono sm:text-2xl ml-2 dark:text-stone-300">
              GUAC Visualizer
            </h1>
          </a>
        </div>
        <button type="button" onClick={toggleThemeHandler}>
          {isDarkTheme ? (
            <SunIcon className="h-8 w-8 text-stone-300" />
          ) : (
            <MoonIcon className="h-8 w-8 text-zinc-600" />
          )}
        </button>
      </div>
    </>
  );
}
