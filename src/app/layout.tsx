import '../styles/global.css'
import type { Metadata } from "next";
import { Ubuntu_Mono } from "next/font/google";
import StoreProvider from "./StoreProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
  title: "Web Sxz",
  description: "Web apps for sxz",
};

const jetBrainsMono = Ubuntu_Mono({
  subsets: ["latin"],
  weight: '400'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={`${jetBrainsMono.className}`}>
        <StoreProvider>
          <ThemeProvider
            defaultTheme="system"
            enableSystem
          >
            {children}
          </ThemeProvider>
        </StoreProvider>
        <GoogleAnalytics gaId="G-Z1G794KZH1" />
        <Toaster />
      </body>
    </html>
  );
}
