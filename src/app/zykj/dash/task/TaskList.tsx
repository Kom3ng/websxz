'use client'
import { TaskListItemsInner } from "@/utils/api/zykj";
import { api } from "@/utils/api/zykj/apiInstance";
import { App, Card, List, Skeleton, Tooltip } from "antd";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useImmer } from "use-immer";

type Task = TaskListItemsInner;

export default function TaskList({ taskType }: { taskType: number }) {
    const loading = useRef<boolean>(false);
    const [tasks, setTasks] = useImmer<Task[]>([]);
    const [totalCount, setCount] = useState(50);
    const { message } = App.useApp();

    const loadMore = () => {
        if (loading.current) return;

        loading.current = true;

        api.taskApi.getStudentTaskList('WebApp', 0, {
            maxResultCount: 50,
            skipCount: tasks.length,
            taskListType: taskType,
        })
            .then(resp => {
                if (resp.status !== 200 || resp.data.error) {
                    return Promise.reject(resp.data.error?.message);
                }
                return resp.data.result;
            })
            .then(result => {
                setCount(result?.totalCount ?? 0);
                setTasks(draft => {
                    draft.push(...result?.items ?? []);
                });
            })
            .catch(err => {
                message.error(err);
            })
            .finally(() => {
                loading.current = false;
            });
    }

    useEffect(() => {
        loadMore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
            <InfiniteScroll
                dataLength={tasks.length}
                next={loadMore}
                hasMore={tasks.length < totalCount}
                loader={<Skeleton active />}
            >
                <List
                    grid={{ 
                        gutter: 16, 
                        column: 4,
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 4,
                        xl: 4,
                        xxl: 5, 
                    }}
                    dataSource={tasks}
                    
                    renderItem={(item: Task) => (

                        <Link href={`/zykj/dash/task/${item.examTaskId}?&hasQst=${!item.isNoStem}`}>
                            <Tooltip title={item.endTime ? `截止时间: ${item.endTime}` : ''}>
                                <Card className="m-2">
                                    <List.Item key={item.examId}>
                                        <List.Item.Meta
                                            title={item.topicName}
                                            description={item.examName}
                                        />
                                    </List.Item>
                                </Card>
                            </Tooltip>
                        </Link>
                    )}>

                </List>
            </InfiniteScroll>
    )
}