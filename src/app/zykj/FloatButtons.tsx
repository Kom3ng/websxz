'use client'
import { SunOutlined } from "@ant-design/icons"
import { FloatButton } from "antd"
import { useThemeMode } from "antd-style";

const FloatButtons: React.FC = () => {
    const { themeMode, setThemeMode } = useThemeMode();
    
    return (
        <FloatButton.Group shape="circle" style={{ right: 24 }}>
            <FloatButton 
                icon={<SunOutlined />}
                onClick={() => {
                    setThemeMode(themeMode === "dark" ? "light" : "dark")
                }}
            />
            <FloatButton.BackTop visibilityHeight={0} onClick={() => window.scrollTo(0,0)} />
        </FloatButton.Group>
    )
}

export default FloatButtons