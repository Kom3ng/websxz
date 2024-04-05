'use client'

import { useStyles } from "@/utils/styles"
import { useTheme } from "antd-style"

export const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { styles } = useStyles()

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: useTheme().colorBgLayout
        }}>
            {children}
        </div>
    )
}