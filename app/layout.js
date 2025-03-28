import NavBar from "@/components/NavBar";
import "./globals.css";
import { Montserrat } from 'next/font/google';
export const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display:'swap',
  fallback: ['Arial', 'sans-serif'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}
      >
        {children}
      </body>
    </html>
  );
}
