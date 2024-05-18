"use client"

import { api } from "@/utils/api/zykj/apiInstance";
import { useRouter, useSearchParams } from "next/navigation"

export default function Page({ params }: { params: { id: string, mistakeId: string } }) {
    const hasStem = useSearchParams().get("hasStem") === "true";
    api.mistakeApi.getMistakeQstItemDetailInfo
    return <></>
}