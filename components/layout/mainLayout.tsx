import Header from "./header";
import Footer from "./footer";

export default function MainLayout({ children }: any) {
  return (
    <>
      <div className="flex flex-col min-h-screen items-stretch">
        <Header />
        <div className="flex-grow bg-zinc-100 dark:bg-zinc-700 text-black dark:text-zinc-50">
          <main className="flex-shrink-0 flex items-center justify-center mt-20">{children}</main>
        </div>
        <div className="flex-shrink-0">
          <Footer />
        </div>
      </div>
    </>
  );
}