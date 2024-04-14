import { GetExamTask200ResponseResult, GetNoQstExam200ResponseResult } from "@/utils/api/zykj";
import { Card, List, Tabs } from "antd";
import QstView from "./QstView";

type ExamData = GetExamTask200ResponseResult

export default function Exam({ data, examTaskId }: { data: ExamData, examTaskId: number }){
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
