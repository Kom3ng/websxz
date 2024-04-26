'use client'

import { api } from "@/utils/api/zykj/apiInstance";
import { App, Card } from "antd";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import Exam from "./Exam";
import { ExamTask, NoQstExam } from "@/utils/api/zykj";

export default function ExamView({ params }: { params: { id: string } }) {
    const id = Number(params.id);
    const hasQst = useSearchParams().get('hasQst') === 'true' ? true : false;
    const { message } = App.useApp()
    const [examData, setExamData] = useState<ExamTask>({});
    const [noQstData, setNoQstData] = useState<NoQstExam>({});
    const taskData = async () => {
        if (hasQst) {
            const resp = await api.taskApi.getExamTask('WebApp', 0, id);
            if (resp.data.error) {
                message.error(resp.data.error.message);
                return null;
            }
            return resp.data.result;
        } else {
            const resp = await api.taskApi.getNoQstExam(id, 'WebApp', 0);
            if (resp.data.error) {
                message.error(resp.data.error.message);
                return null;
            }
            return resp.data.result;
        }
    };

    useEffect(() => {
        taskData().then(data => {
            if (data) {
                if (hasQst) {
                    setExamData(data as ExamTask);
                } else {
                    setNoQstData(data as NoQstExam);
                }
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            {examData ? <Exam data={examData} examTaskId={id} /> : <></>}
        </>
    )
}