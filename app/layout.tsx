import { GuacVizThemeContextProvider } from "@/store/themeContext";
import "@/styles/globals.css";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GuacVizThemeContextProvider>
          <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-grow bg-zinc-100 dark:bg-zinc-700 text-black dark:text-zinc-50">
              {children}
            </main>
            <Footer />
          </div>
        </GuacVizThemeContextProvider>
      </body>
    </html>
  );
}
