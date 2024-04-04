'use client'
import { ConfigProvider, theme } from "antd";

export default function ThemeConfigProvider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <ConfigProvider theme={theme.defaultConfig}>
            {children}
        </ConfigProvider>
    )
  }