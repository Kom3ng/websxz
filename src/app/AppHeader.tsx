'use client'

import { Menu } from "antd";
import { useTheme } from "antd-style";
import { Header } from "antd/es/layout/layout";
import GithubLink from "./GithubLink";
import Link from "next/link";

export default function AppHeader() {
    return (
        <Header className="flex justify-between items-center" style={{
            backgroundColor: useTheme().colorBgContainer,
        }}>
            <div className="flex space-x-4 items-center">
                <div className="felx items-center">
                    <p className="text-3xl font-bold">WebSxz</p>
                </div>
                <Menu mode="horizontal">
                    <Menu.Item><Link href='/zykj'>中育</Link></Menu.Item>
                </Menu>
            </div>
            <div className="flex items-center">
                <GithubLink />
            </div>
        </Header>
    );
}