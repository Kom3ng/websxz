import { GetQuestionView200ResponseResult } from "@/utils/api/zykj";
import { api } from "@/utils/api/zykj/apiInstance"
import { App, Card, Checkbox, GetProp, List, Radio, RadioChangeEvent, Spin } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import axios from "axios";
import { resolve } from "path";
import { use, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

type QstView = GetQuestionView200ResponseResult;

export default function QstView({ examId, qstId, taskId }: { examId: number, qstId: number, taskId: number }) {
    const [data, setData] = useState<QstView>({});
    const [qstHtml, setQstHtml] = useState<string>('');
    const { message } = App.useApp();

    useEffect(() => {
        const requestData = (times: number) => {
            api.taskApi.getQuestionView(0, 'WebApp', examId, qstId)
            .then(resp => {
                if (!resp.data.success) {
                    return Promise.reject(resp.data.error);
                }
                setData(resp.data.result ?? {});

                return axios.get('https://proxy.astrack.me/zykj'+resp.data.result?.path)
            })
            .then(resp => {
                const html = resp.data.replace('padding: 10px;', '').replace('padding-bottom: 400px;','')
                setQstHtml(html);
            })
            .catch(err => {
                if (err?.code === 503){
                    if (times > 3) {
                        message.error(err.message)
                        return;
                    }
                    setTimeout(() => {
                        requestData(times + 1);
                    },1000)
                    return;
                }
                if (err?.message){
                    message.error(err.message);
                }
                message.error(err);
            });
        }
        requestData(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [examId, qstId])

    const onChoose = (e: RadioChangeEvent) => {
        api.taskApi.examAnswer(0,'WebApp',taskId,{
            answers: [
                {
                    answers: [e.target.value],
                    uuid: uuidv4()
                }
            ],
            draft: '',
            questionId: qstId
        })
    }

    const onMultiChoose: GetProp<typeof Checkbox.Group, 'onChange'>  = (v) => {
        api.taskApi.examAnswer(0,'WebApp',taskId,{
            answers: [
                {
                    answers: v.map(v => v.toString()),
                    uuid: uuidv4()
                }
            ],
            draft: '',
            questionId: qstId
        })
    }

    return <Card style={{
        margin: 16
    }}>
        {
            data ?
            <>{
                qstHtml ?
                    <div dangerouslySetInnerHTML={{ __html: qstHtml }} />
                    : <Spin />
            }
    
            {
                <List
                    dataSource={data.qstFlows}
                    renderItem={item => {
                        switch (item.qstType) {
                            case 0: {
                                return <Radio.Group
                                    onChange={onChoose}
                                >
                                    {
                                        item.options?.map(opt => {
                                            return <Radio.Button key={opt} value={opt}>{opt}</Radio.Button>
                                        })
                                    }
                                </Radio.Group>
                            }
    
                            case 2: {
                                return <Checkbox.Group
                                    onChange={onMultiChoose}
                                >
                                    {
                                        item.options?.map(opt => {
                                            return <Checkbox key={opt} value={opt}>{opt}</Checkbox>
                                        })
                                    }
                                </Checkbox.Group>
                            }
                        }
                    }}
                />
            }</> : <Spin/>
        }
        
    </Card>
}