'use client'

import { Avatar, Menu, MenuProps } from "antd"
import { useTheme } from "antd-style"
import { Header } from "antd/es/layout/layout"
import Link from "next/link";
import { useRouter } from "next/navigation";



export function AppHeader() {
    const router = useRouter();

    const items: MenuProps['items'] = [
        { key: '1', label: 'Task', onClick: () => router.push('/dash/task')},
    ];

    return (
        <Header
                style={{
                    display: 'flex', 
                    position: 'sticky',
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
    )
}