import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NextThemeProvider from "@/lib/Providers/NextThemeProvider";

export default function RootLayout({ children }) {
  return (
    <div>
      <NextThemeProvider>
        <Navbar />
        <div className="flex-grow flex flex-col">{children}</div>
        <Footer />
      </NextThemeProvider>
    </div>
  );
}
