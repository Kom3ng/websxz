import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "./StoreProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web Sxz",
  description: "Web apps for sxz",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body style={{ height: '100%', margin: 0, padding: 0 }}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
