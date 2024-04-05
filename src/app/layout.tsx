import { Body } from "@/components/Body";
import ClientInitlizer from "@/components/ClientInitlizer";
import FloatButtons from "@/components/FloatButtons";
import LayoutX from "@/components/LayoutX";
import StoreProvider from "@/components/StoreProvider";
import StyleRegistry from "@/components/StyleRegistry";
import ThemeConfigProvider from "@/components/ThemeConfigProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout } from "antd";
import { StyleProvider, createStyles, extractStaticStyle } from "antd-style";
import { Header } from "antd/es/layout/layout";
import type { Metadata } from "next";
import { Inter } from "next/font/google";


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
      <body>
        <AntdRegistry>
          <StoreProvider>
            <ClientInitlizer />
            <ThemeConfigProvider>
              <StyleRegistry>
                <Body>
                  <FloatButtons />
                  {children}
                </Body>
              </StyleRegistry>
            </ThemeConfigProvider>
          </StoreProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
