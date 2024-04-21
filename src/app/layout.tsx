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
      <body className={jetBrainsMono.className} style={{ height: '100%', margin: 0, padding: 0 }}>
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
