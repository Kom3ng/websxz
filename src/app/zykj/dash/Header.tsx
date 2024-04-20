'use client'

import { useStoreSelector } from "@/store";
import { Avatar, Menu, MenuProps } from "antd"
import { useTheme } from "antd-style"
import { Header } from "antd/es/layout/layout"
import { useRouter } from "next/navigation";
import AppAvatar from "./AppAvatar";



export function AppHeader() {
    const router = useRouter();
    const userInfo = useStoreSelector(state => state.userInfo);

    const items: MenuProps['items'] = [
        { key: '1', label: 'Task', onClick: () => router.push('/zykj/dash/task')},
        { key: '2', label: '在线专栏', onClick: () => {
            if (window) {
                window.open(`http://sxz.school.zykj.org/navPage.html?apiHost=http://sxz.api6.zykj.org&apiToken=${userInfo.accessToken}&timeStamp=${Date.now()}`);
            }
        }},
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
                <AppAvatar />
            </Header>
    )
}