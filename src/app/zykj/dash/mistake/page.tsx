"use client"

import { GetMyMistakeBooks200ResponseResultInner } from "@/utils/api/zykj";
import { api } from "@/utils/api/zykj/apiInstance";
import { App, Card } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
    const [ books, setBooks ] = useState<GetMyMistakeBooks200ResponseResultInner[]>();
    const { message } = App.useApp();

    useEffect(() => {
        api.mistakeApi.getMyMistakeBooks()
            .then(resp => resp.data)
            .then(data => {
                if (!data.success) {
                    message.error(data.error?.message);
                    return;
                }

                setBooks(data.result ?? []);
            })
    }, [])

    return <Card className="m-5">
        <div className="grid grid-cols-5 sm:grid-cols-3 gap-12">
            {books?.map(book =>
                <Link href={`/zykj/dash/mistake/${book.id}`}>
                    <div key={book.id} className="border border-zinc-200 dark:border-zinc-800 p-4 rounded-lg min-h-24">
                        <h1 className="font-bold ml-4 text-lg">{book.topic?.content}</h1>
                    </div>
                </Link>
            )}
        </div>
    </Card>
}