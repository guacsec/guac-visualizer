import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function MainLayout({ children }: any) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow bg-zinc-100 dark:bg-zinc-700 text-black dark:text-zinc-50">
        {children}
      </div>
      <div className="flex-shrink-0">
        <Footer />
      </div>
    </div>
  );
}
