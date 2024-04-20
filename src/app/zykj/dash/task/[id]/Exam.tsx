import { List, Tabs } from "antd";
import QstView from "./QstView";
import { ExamTask } from "@/utils/api/zykj";

export default function Exam({ data, examTaskId }: { data: ExamTask, examTaskId: number }){
    const items = data.groups?.map(group => {
        return {
            key: group.number?.toString() ?? '',
            label: group.name ?? '',
            children: <List
                dataSource={group.questions} 
                renderItem={item => {
                    if (!data.examId || !item.id) {
                        return <></>
                    }
                    return <QstView 
                        examId={data.examId} 
                        qstId={item.id}
                        taskId={examTaskId}
                    />
                }}
            />
        }
    })

    return (
            <Tabs
                tabPosition='left'
                defaultActiveKey='1'
                items={items}
            />
        
    )
}
