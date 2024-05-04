import { App, Checkbox, List, Radio, RadioChangeEvent, Spin, Tabs } from "antd";
import { NoQstExam } from "@/utils/api/zykj";
import dynamic from "next/dynamic";
import getOss from "@/app/zykj/oss";
import { useStoreSelector } from "@/store";
import { api } from "@/utils/api/zykj/apiInstance";
import { CheckboxValueType } from "antd/es/checkbox/Group";
const DrawPad = dynamic(
    async () => (await import('../../DrawPad')).default,
    {
        loading: () => <Spin />,
        ssr: false
    }
);

export default function NoQstExamView({ data, examTaskId }: { data: NoQstExam, examTaskId: number }) {
    const { message } = App.useApp();
    const userInfo = useStoreSelector(state => state.userInfo);

    const onChoose = (e: RadioChangeEvent, uuid: string, qstId: number) => {
        api.taskApi.examAnswer(undefined, undefined, examTaskId, {
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

    const onMultiChoose = (v: CheckboxValueType[], uuid: string, qstId: number) => {
        api.taskApi.examAnswer(undefined, undefined, examTaskId, {
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

                    const firstQst = item.qstFlows?.at(0);
                    const uuid = firstQst?.uuid;

                    if (firstQst?.type === 5) {
                        return <div className="h-[500px]">
                            <DrawPad onExport={(blob) => {
                                const oss = getOss();

                                const path = `answers/${userInfo.userId}/ToCorrect/${examTaskId}/${item.id}/${uuid}/sketch/answer_${Date.now()}.webp`;

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
                                    api.taskApi.examAnswer(undefined, undefined, examTaskId, {
                                        answers: [
                                            {
                                                answers: [`http://ezy-sxz.oss-cn-hangzhou.aliyuncs.com/${path}`],
                                                uuid
                                            }
                                        ],
                                        draft: '',
                                        questionId: item.id
                                    })
                                })
                            }} />
                        </div>
                    } else {
                        return <List
                            dataSource={item.qstFlows ?? []}
                            renderItem={(i) => {
                                switch (i.qstType) {
                                    case 0: {
                                        return <Radio.Group
                                            className="m-2"
                                            onChange={(e) => onChoose(e, i.uuid ?? '', item.id ?? 0)}
                                        >
                                            {
                                                i.options?.map(opt => {
                                                    return <Radio.Button key={opt} value={opt}>{opt}</Radio.Button>
                                                })
                                            }
                                        </Radio.Group>
                                    }
                                    case 2: {
                                        return <Checkbox.Group
                                            className="m-2"
                                            onChange={(v) => onMultiChoose(v, i.uuid ?? '', item.id ?? 0)}
                                        >
                                            {
                                                i.options?.map(opt => {
                                                    return <Checkbox key={opt} value={opt}>{opt}</Checkbox>
                                                })
                                            }
                                        </Checkbox.Group>
                                    }

                                    case 4: {
                                        return <List
                                            dataSource={i.subQuestions ?? [item]}
                                            renderItem={(i) => {
                                                return (
                                                    <div className="m-12 h-60">
                                                        <DrawPad onExport={(blob) => {
                                                            const oss = getOss();

                                                            const path = `answers/${userInfo.userId}/ToCorrect/${examTaskId}/${item.id}/${i.uuid}/sketch/answer_${Date.now()}.webp`;

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
                                                                api.taskApi.examAnswer(undefined, undefined, examTaskId, {
                                                                    answers: [
                                                                        {
                                                                            answers: [`http://ezy-sxz.oss-cn-hangzhou.aliyuncs.com/${path}`],
                                                                            uuid: i.uuid
                                                                        }
                                                                    ],
                                                                    draft: '',
                                                                    questionId: item.id
                                                                })
                                                            })
                                                        }} />

                                                    </div>
                                                )
                                            }} />;
                                    }

                                    default: {
                                        return <></>
                                    }
                                }
                            }}
                        />
                    }
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
