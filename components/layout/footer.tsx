'use client';

import {useEffect, useState} from "react";

export default function Footer() {
  const [versionData, setData] = useState({guacgql: "", guacVisualizer: ""})
  useEffect(() => {
    fetch('/api/version')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
  }, []);

  return (
    <>
      <div className="flex justify-center bg-stone-200 dark:bg-stone-800 px-2 md:px-20 items-center backdrop-blur-sm w-full py-4">
        <h1 className="text-black sm:text-lg ml-2 dark:text-white">
          We&apos;d love to hear how we can make the visualizer more useful.{" "}
          <a
            className="text-purple-900 font-semibold"
            href="https://forms.gle/Bv1RgaPvuxXdJPt17"
            target="blank"
          >
            Send feedback here!
          </a>
        </h1>
      </div>
      <div
        className="flex justify-center bg-stone-200 dark:bg-stone-800 px-2 md:px-20 items-center backdrop-blur-sm w-full py-1">
        <small className="text-gray-400">Served by GUAC GraphQL {versionData.guacgql}</small>
      </div>
    </>
  );
}
