import ClientInitlizer from "@/components/ClientInitlizer";
import StoreProvider from "@/components/StoreProvider";
import ThemeConfigProvider from "@/components/ThemeConfigProvider";
import { store } from "@/store";
import { loginStatusSlice, userInfoSlice } from "@/store/userInfo";
import { api } from "@/utils/api/zykj/apiInstance";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import axios from "axios";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";

const ConfigProvider = dynamic(
  () => import("antd").then((antd) => antd.ConfigProvider),
  { ssr: false }
);

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
            <ClientInitlizer>
              <ThemeConfigProvider>
                {children}
              </ThemeConfigProvider>
            </ClientInitlizer>
          </StoreProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
