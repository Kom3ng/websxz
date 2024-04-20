import FloatButtons from "@/app/zykj/FloatButtons";
import StyleRegistry from "@/app/zykj/StyleRegistry";
import ThemeConfigProvider from "@/app/zykj/ThemeConfigProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App } from "antd";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientInitlizer from "./ClientInitlizer";


export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AntdRegistry>
            <ClientInitlizer />
            <ThemeConfigProvider>
                <StyleRegistry>
                    <App>
                        <FloatButtons />
                        {children}
                    </App>
                </StyleRegistry>
            </ThemeConfigProvider>
        </AntdRegistry>
    );
}
