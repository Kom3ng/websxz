import { Card, Tabs } from "antd";

export default function MistakePage() {
    return (
        <Card style={{
            margin: '20px',
        }}>
            <Tabs
                tabPosition="left"
                defaultActiveKey="1"
                items={[
                    { key: '1', label: 'aa', children: 'aaa' }
                ]}>

            </Tabs>
        </Card>
    )
}