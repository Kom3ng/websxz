"use client"
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { CustomMistakeInfo } from "@/utils/api/zykj";
import { api } from "@/utils/api/zykj/apiInstance";
import Image from "next/image";
import { useEffect, useState } from "react"

export default function CustomMistakeView({ id }: { id: number }) {
    const [data, setData] = useState<CustomMistakeInfo>({});
    const { toast } = useToast();
    useEffect(() => {
        api.mistakeApi.getCustomMistakeQstItemDetailInfo(undefined, undefined, id)
            .then((resp) => {
                if(!resp.data.success) {
                    toast({
                        content: resp.data.error?.message || "获取数据失败",
                        variant: "destructive",
                    });
                } else {
                    setData(resp.data.result || {});
                }
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return <Card className="p-4 flex items-center">
        <div className="w-96">
            {data.extraStems?.map((stem, index) => <Image key={index} height={200} width={200} src={stem} className="max-w-32" alt="stem" />)}
        </div>
        <div className="flex justify-between">
            <h1>图片笔记</h1>
            {data.pictureNote?.map((pictureNote, index) => <Image key={index} height={200} width={200} src={pictureNote} className="max-w-32" alt="stem" />)}
        </div>
    </Card>
}