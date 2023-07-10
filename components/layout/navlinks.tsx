export default function NavigationLinks() {
  return (
    <>
      <a
        className="block py-1 text-sm text-gray-800 dark:text-stone-300 hover:bg-white dark:hover:bg-black rounded-xl p-3 my-2"
        href="https://github.com/guacsec/guac-visualizer"
        target="blank"
      >
        GitHub
      </a>
      <a
        className="block py-1 text-sm text-gray-800 dark:text-stone-300 hover:bg-white dark:hover:bg-black rounded-xl p-3 my-2"
        href="https://docs.guac.sh/"
        target="blank"
      >
        GUAC Docs
      </a>
      <a
        className="block py-1 text-sm text-gray-800 dark:text-stone-300 hover:bg-white dark:hover:bg-black rounded-xl p-3 my-2"
        href="https://guac.sh/community/"
      >
        Community
      </a>
    </>
  );
}
