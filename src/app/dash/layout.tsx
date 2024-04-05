'use client'
import { Avatar, Layout, Menu, MenuProps, theme } from "antd";
import { useTheme } from "antd-style";
import { Content, Header } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";
import React from "react";

export default function DashLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const items: MenuProps['items'] = [
        { key: '1', label: 'Mistake', onClick: () => router.push('/dash/mistake') },
    ];
    
    return (
        <Layout>
            <Header
                style={{
                    display: 'flex', 
                    alignItems: 'center',
                    backgroundColor: useTheme().colorBgContainer,
                }}>
                <Menu
                    mode="horizontal"
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}
                />
                <Avatar />
            </Header>
            <Content>{children}</Content>
        </Layout>
    )
}