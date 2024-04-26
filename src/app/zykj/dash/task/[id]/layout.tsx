import { Card } from "antd";

export default function TaskLayout({children}: {children: React.ReactNode}) {
    return (
        <Card className="m-6">
            {children}
        </Card>
    )
}