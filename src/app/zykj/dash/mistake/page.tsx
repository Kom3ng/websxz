"use client"

import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { GetMyMistakeBooks200ResponseResultInner } from "@/utils/api/zykj";
import { api } from "@/utils/api/zykj/apiInstance";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { SlChemistry } from "react-icons/sl";
import { FaAtom, FaBook, FaBug, FaCalculator, FaDna, FaEarthAsia, FaHammer, FaLanguage, FaPalette, FaPeace, FaPen, FaScaleBalanced, FaSchool } from "react-icons/fa6";

function subjectIcon(id: number): ReactNode{
    switch (id) {
        case 5: return <FaCalculator className="size-6" />;
        case 6: return <FaLanguage className="size-6" />;
        case 4: return <FaPen className="size-6" />;
        case 8: return <SlChemistry className="size-6" />;
        case 7: return <FaAtom className="size-6" />;
        case 9: return <FaDna className="size-6" />;
        case 10: return <FaScaleBalanced className="size-6" />;
        case 11: return <FaPeace className="size-6" />;
        case 12: return <FaEarthAsia className="size-6" />;
        case 15: return <FaHammer className="size-6" />;
        case 35: return <FaPalette className="size-6" />;
        case 68: return <FaBug className="size-6" />;
        case 92: return <FaSchool className="size-6" />;
        default: return <FaBook className="size-6" />
    }
}

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

    return <Card>
        <div className="grid grid-cols-5 sm:grid-cols-3">
            {books?.map(book =>
                <Link key={book.id} href={`/zykj/dash/mistake/${book.id}`} className="m-4">
                    <div className="border border-zinc-200 dark:border-zinc-800 p-4 rounded-lg min-h-24 flex items-center shadow transition hover:scale-105">
                        {subjectIcon(book.topic?.id || 0)}
                        <h1 className="font-bold ml-4 text-lg">{book.topic?.content}</h1>
                    </div>
                </Link>
            )}
        </div>
    </Card>
}