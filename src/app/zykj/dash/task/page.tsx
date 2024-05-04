import { Card, Tabs } from "antd";
import TaskList from "./TaskList";

export default function MistakePage() {
    return (
        <Card className="m-5">
            <Tabs 
            tabPosition='left'
            items={[
                {label: '全部',key: 'all' , children: <TaskList taskType={0} />},
                {label: '已批改',key: 't1' , children: <TaskList taskType={1} />},
                {label: '已完成',key: 't2' , children: <TaskList taskType={2} />},
            ]}
            defaultActiveKey="task"/>
        </Card>
    )
}