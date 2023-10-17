import "@/styles/globals.css";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { GuacVizThemeContextProvider } from "@/app/themeContext";

export const metadata = {
  title: "GUAC Visualizer",
  description:
    "GUAC Visualizer is an experimental utility that can be used to visualized data loaded from GUAC.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <GuacVizThemeContextProvider>
        <body>
          <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-grow bg-zinc-100 dark:bg-zinc-700 text-black dark:text-zinc-50">
              {children}
            </main>
            <Footer />
          </div>
        </body>
      </GuacVizThemeContextProvider>
    </html>
  );
}
