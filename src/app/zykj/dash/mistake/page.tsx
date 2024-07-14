"use client"

import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { GetMyMistakeBooks200ResponseResultInner } from "@/utils/api/zykj";
import { api } from "@/utils/api/zykj/apiInstance";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
    const [ books, setBooks ] = useState<GetMyMistakeBooks200ResponseResultInner[]>();

    useEffect(() => {
        api.mistakeApi.getMyMistakeBooks()
            .then(resp => resp.data)
            .then(data => {
                if (!data.success) {
                    toast({
                        description: data.error?.message,
                        variant: 'destructive'
                    })
                    return;
                }

                setBooks(data.result ?? []);
            })
    }, [])

    return <Card className="m-5">
        <div className="grid grid-cols-5 sm:grid-cols-3 gap-12">
            {books?.map(book =>
                <Link key={book.id} href={`/zykj/dash/mistake/${book.id}`}>
                    <div className="border border-zinc-200 dark:border-zinc-800 p-4 rounded-lg min-h-24">
                        <h1 className="font-bold ml-4 text-lg">{book.topic?.content}</h1>
                    </div>
                </Link>
            )}
        </div>
    </Card>
}