"use client"

import { SearchMistakeQstItems200ResponseResultItemsInner } from "@/utils/api/zykj";
import { api } from "@/utils/api/zykj/apiInstance";
import { App, Card, Image, List, Skeleton, Tooltip } from "antd";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Page({ params }: { params: { id: string } }) {
    const id = Number(params.id);

    const [totalCount, setTotalCount] = useState(20);
    const [mistakse, setMistakes] = useState<SearchMistakeQstItems200ResponseResultItemsInner[]>([]);
    const { message } = App.useApp();
    const loading = useRef<boolean>(false);

    const loadMore = () => {
        if (loading.current) return;

        loading.current = true;

        api.mistakeApi.searchMistakeQstItems(undefined, undefined, {
            attainedLevel: [],
            bookId: id,
            diff: [],
            errorReason: [],
            haveNoTag: false,
            maxResultCount: 20,
            skipCount: mistakse.length,
            tagIdList: []
        })
            .then(resp => resp.data)
            .then(data => {
                if (!data.success) {
                    message.error(data.error?.message);
                    return;
                }

                setTotalCount(data.result?.totalCount || 0);
                setMistakes([...mistakse, ...data.result?.items || []]);
            })
            .finally(() => {
                loading.current = false;
            });
    }

    useEffect(() => {
        loadMore();
    }, [id]);

    return <Card className="m-5">
        <InfiniteScroll
            dataLength={mistakse.length}
            next={loadMore}
            hasMore={mistakse.length < totalCount}
            loader={<Skeleton active />}
        >
            <List
                grid={{
                    gutter: 16,
                    column: 4,
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 3,
                    xl: 3,
                    xxl: 4,
                }}
                dataSource={mistakse}

                renderItem={(item: SearchMistakeQstItems200ResponseResultItemsInner) =>
                    <Link href={`/zykj/dash/mistake/${id}/${item.id}?hasStem=${item.hasStem}`}>
                        <Card
                            className="m-8"
                            title={item.source}
                        >
                            {item.stemShoot && <Image src={item.stemShoot} alt="stemShoot" />}
                        </Card>
                    </Link>
                }
            />
        </InfiniteScroll>
    </Card>
}