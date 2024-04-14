'use client'

import { useStyles } from "@/utils/styles"
import { useTheme } from "antd-style"

export const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { styles } = useStyles()

    return (
        <>
            {children}
        </>
    )
}