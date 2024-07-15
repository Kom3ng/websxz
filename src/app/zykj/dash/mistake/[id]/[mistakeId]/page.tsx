"use client"

import { api } from "@/utils/api/zykj/apiInstance";
import { useRouter, useSearchParams } from "next/navigation"
import CustomMistakeView from "./CustomMistakeView";

export default function Page({ params }: { params: { id: string, mistakeId: string } }) {
    const hasStem = useSearchParams().get("hasStem") === "true";
    

    if (hasStem) {
        return <></>;
    } else {
        return <CustomMistakeView id={parseInt(params.mistakeId)} />;
    }
}