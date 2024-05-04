import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Oswald, Ubuntu_Mono } from "next/font/google";
import StoreProvider from "./StoreProvider";
import '../styles/global.css'
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ThemeConfigProvider from "./ThemeConfigProvider";
import StyleRegistry from "./StyleRegistry";
import { App } from "antd";

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
      <body className={`${jetBrainsMono.className} 
      bg-neutral-50 dark:bg-neutral-950
      text-neutral-100 dark:text-neutral-900`}>
        <StoreProvider>
          <AntdRegistry>
            <ThemeConfigProvider>
              <StyleRegistry>
                <App>
                  {children}
                </App>
              </StyleRegistry>
            </ThemeConfigProvider>
          </AntdRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
