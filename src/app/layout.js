import "./globals.css";

export const metadata = {
  title: "Smart Bremen",
  description: "Test Test Test",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
