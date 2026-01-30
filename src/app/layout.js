import Header from "@/components/Header";
import AuthProvider from "@/components/AuthProvider";
import "./globals.css";
import { Manrope } from "next/font/google";

export const metadata = {
  title: "Smart Bremen",
  description: "Test Test Test",
};

const manrope = Manrope({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.className}>
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
