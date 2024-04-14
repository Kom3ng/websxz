import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { AppHeader } from "./Header";

export default function DashLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <Layout>
            <AppHeader />
            <Content>{children}</Content>
        </Layout>
    )
}