"use client"

import { Card, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { SearchMistakeQstItems200ResponseResultItemsInner } from "@/utils/api/zykj";
import { api } from "@/utils/api/zykj/apiInstance";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import List from 'rc-virtual-list';
import Image from "next/image";

export default function Page({ params }: { params: { id: string } }) {
    const id = Number(params.id);

    const [totalCount, setTotalCount] = useState(20);
    const [mistakse, setMistakes] = useState<SearchMistakeQstItems200ResponseResultItemsInner[]>([]);
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
                    toast({
                        description: data.error?.message,
                        variant: 'destructive'
                    })
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

    return <div className="p-4">
        <InfiniteScroll
            dataLength={mistakse.length}
            next={loadMore}
            hasMore={mistakse.length < totalCount}
            loader={
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            }
        >
                <List
                    className="p-4"
                    data={mistakse}
                    itemKey='id'
                    innerProps={{
                        // @ts-ignore
                        style: {
                            display: 'grid',
                        },
                        className: "grid-cols-3 gap-8"
                    }}
                >
                    {item => {
                        return (
                            <Link href={`/zykj/dash/mistake/${id}/${item.id}?hasStem=${item.hasStem}`}>
                                <Card className="p-8 space-y-4 shadow transition hover:scale-105">
                                    <CardTitle>{item.source}</CardTitle>
                                    {item.stemShoot && <Image src={item.stemShoot} alt="stem" width={200} height={200} className="max-w-full max-h-32" />}
                                </Card>
                            </Link>
                        )
                    }}
                </List>
        </InfiniteScroll>
    </div>
}