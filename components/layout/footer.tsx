export default function Footer() {
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
    </>
  );
}
