import { api } from "@/utils/api/zykj/apiInstance"
import { App, Button, Card, Checkbox, GetProp, List, Radio, RadioChangeEvent, Spin } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import DrawPad from "../../DrawPad";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { Footer, exportToBlob } from "@excalidraw/excalidraw";
import getOss from "@/app/zykj/oss";
import { useStoreSelector } from "@/store";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { QuestionView } from "@/utils/api/zykj";

export default function QstView({ examId, qstId, taskId }: { examId: number, qstId: number, taskId: number }) {
    const [data, setData] = useState<QuestionView>({});
    const [qstHtml, setQstHtml] = useState<string>('');
    const { message } = App.useApp();
    const drawPads = useRef<Map<string, ExcalidrawImperativeAPI>>(new Map());
    const userInfo = useStoreSelector(state => state.userInfo);

    useEffect(() => {
        const requestData = (times: number) => {
            api.taskApi.getQuestionView(0, 'WebApp', examId, qstId)
                .then(resp => {
                    if (!resp.data.success) {
                        return Promise.reject(resp.data.error);
                    }
                    setData(resp.data.result ?? {});

                    return axios.get('https://proxy.astrack.me/zykj' + resp.data.result?.path)
                })
                .then(resp => {
                    const html = resp.data.replace('padding: 10px;', '').replace('padding-bottom: 400px;', '')
                    setQstHtml(html);
                })
                .catch(err => {
                    if (err?.code === 503) {
                        if (times > 3) {
                            message.error(err.message)
                            return;
                        }
                        setTimeout(() => {
                            requestData(times + 1);
                        }, 1000)
                        return;
                    }
                    if (err?.message) {
                        message.error(err.message);
                    }
                    message.error(err);
                });
        }
        requestData(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [examId, qstId])

    const onChoose = (e: RadioChangeEvent, uuid: string) => {
        api.taskApi.examAnswer(0, 'WebApp', taskId, {
            answers: [
                {
                    answers: [e.target.value],
                    uuid
                }
            ],
            draft: '',
            questionId: qstId
        })
    }

    const onMultiChoose = (v: CheckboxValueType[], uuid: string) => {
        api.taskApi.examAnswer(0, 'WebApp', taskId, {
            answers: [
                {
                    answers: v.map(v => v.toString()),
                    uuid
                }
            ],
            draft: '',
            questionId: qstId
        })
    }

    const submitDrawPad = (uuid: string) => {
        const eApi = drawPads.current.get(uuid);

        if (!eApi) return;

        const blob = exportToBlob(
            {
                elements: eApi.getSceneElements(),
                appState: eApi.getAppState(),
                files: eApi.getFiles(),
                mimeType: 'image/webp'
            }
        )

        const oss = getOss();

        const path = `answers/${userInfo.userId}/ToCorrect/${taskId}/${qstId}/${uuid}/sketch/answer_${Date.now()}.webp`;

        Promise.all([
            oss,
            blob
        ]).then(([o, b]) => {
            return o.put(path, b);
        }).then((r) => {
            if (r.res.status === 200) {
                message.success('上传成功!');
            }
        }).then(() => {
            api.taskApi.examAnswer(0, 'WebApp', taskId, {
                answers: [
                    {
                        answers: [`http://ezy-sxz.oss-cn-hangzhou.aliyuncs.com/${path}`],
                        uuid
                    }
                ],
                draft: '',
                questionId: qstId
            })
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
                        data.itemType === 5 ?
                            <div style={{
                                height: 500
                            }}>
                                <DrawPad exalidrawApi={(api) => drawPads.current.set(data.qstFlows?.at(0)?.uuid ?? '', api)} >
                                    <Footer>
                                        <Button style={{
                                            marginLeft: "0.5rem",
                                        }} onClick={() => submitDrawPad(data.qstFlows?.at(0)?.uuid ?? '')}>完成</Button>
                                    </Footer>
                                </DrawPad>
                            </div>
                            :
                            <List
                                dataSource={data.qstFlows}
                                renderItem={item => {
                                    switch (item.qstType) {
                                        case 0: {
                                            return <Radio.Group
                                                onChange={(e) => onChoose(e, item.uuid ?? '')}
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
                                                onChange={(v) => onMultiChoose(v, item.uuid ?? '')}
                                            >
                                                {
                                                    item.options?.map(opt => {
                                                        return <Checkbox key={opt} value={opt}>{opt}</Checkbox>
                                                    })
                                                }
                                            </Checkbox.Group>
                                        }

                                        case 4: {
                                            return <List
                                                dataSource={item.subQuestions ?? [item]}
                                                renderItem={(i) => {
                                                    return (
                                                        <div style={{
                                                            height: 250,
                                                            margin: 50
                                                        }}>
                                                            <DrawPad exalidrawApi={(api) => drawPads.current.set(i.uuid ?? '', api)} >
                                                                <Footer>
                                                                    <Button style={{
                                                                        marginLeft: "0.5rem",
                                                                    }} onClick={() => submitDrawPad(item.uuid ?? '')}>完成</Button>
                                                                </Footer>
                                                            </DrawPad>

                                                        </div>
                                                    )
                                                }} />;
                                        }
                                    }
                                }}
                            />
                    }</> : <Spin />
        }

    </Card>
}