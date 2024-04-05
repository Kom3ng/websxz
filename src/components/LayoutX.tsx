'use client'
import { App, Layout, theme } from "antd"
import { createStyles, useTheme } from "antd-style"
import { Content, Header } from "antd/es/layout/layout";
import React from "react";
import { Flexbox } from 'react-layout-kit';


const LayoutX: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const theme = useTheme();
    
    return (
        <App>
            <Flexbox
            gap={theme.paddingLG}
            style={{
              background: theme.colorBgLayout,
              padding: `${theme.paddingXL}px ${theme.paddingLG}px`,
            }}>
                {children}
            </Flexbox>
        </App>
    )
}

export default LayoutX