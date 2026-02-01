import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ProductProvider } from "@/context/ProductContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Daraz BD | Premium E-commerce Experience",
  description: "Official marketer for Daraz. Buy the best products with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ProductProvider>
            <Navbar />
            <main className="min-h-screen transition-colors duration-300">
              {children}
            </main>
            <Footer />
          </ProductProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
