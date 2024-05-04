'use client'

import { api } from "@/utils/api/zykj/apiInstance";
import {App, FloatButton, Spin} from "antd";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import Exam from "./Exam";
import { ExamTask, NoQstExam } from "@/utils/api/zykj";
import NoQstExamView from "./NoQstExam";

export default function ExamView({ params }: { params: { id: string } }) {
    const id = Number(params.id);
    const hasQst = useSearchParams().get('hasQst') === 'true';
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
          { hasQst ? 
          (examData ? <Exam data={examData} examTaskId={id} /> : <Spin />):
          (noQstData ? <NoQstExamView data={noQstData} examTaskId={id} ></NoQstExamView>:<Spin />)}
            <FloatButton
                tooltip={<div>提交</div>}
                onClick={() => {
                api.taskApi.complete(undefined, undefined, id, true).then(resp => {
                    if (resp.data.error) {
                        message.error(resp.data.error.message);
                        return;
                    }
                    message.success('提交成功');
                })
            }}></FloatButton>
        </>
    )
}
