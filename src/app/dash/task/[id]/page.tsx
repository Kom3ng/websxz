'use client'

import { api } from "@/utils/api/zykj/apiInstance";
import { App, Card } from "antd";
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react";
import Exam from "./Exam";
import { GetExamTask200ResponseResult, GetNoQstExam200ResponseResult } from "@/utils/api/zykj";

export default function ExamView({params}: {params: {id: string}}){
    const id = Number(params.id);
    const hasQst = useSearchParams().get('hasQst') === 'true' ? true : false;
    const examTaskId = Number.parseInt(useSearchParams().get('examTaskId') ?? '0');
    const {message} = App.useApp()
    const [examData, setExamData] = useState<GetExamTask200ResponseResult>({});
    const [noQstData, setNoQstData] = useState<GetNoQstExam200ResponseResult>({});
    const taskData = useMemo(async () => {
        if (hasQst) {
            const resp = await api.taskApi.getExamTask('WebApp',0,examTaskId);
            if (resp.data.error) {
                message.error(resp.data.error.message);
                return null;
            }
            return resp.data.result;
        } else {
            const resp = await api.taskApi.getNoQstExam(examTaskId,'WebApp',0);
            if (resp.data.error) {
                message.error(resp.data.error.message);
                return null;
            }
            return resp.data.result;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id,hasQst]);

    useEffect(() => {
        taskData.then(data => {
            if (data) {
                if (hasQst) {
                    setExamData(data as GetExamTask200ResponseResult);
                } else {
                    setNoQstData(data as GetNoQstExam200ResponseResult);
                }
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <Card style={{
            margin: 24,
        }}>
            {
                examData ? <Exam data={examData} examTaskId={examTaskId} /> : <></>
            }
        </Card>
    )
}