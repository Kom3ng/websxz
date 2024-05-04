"use client"

import { useStoreSelector } from "@/store";
import Link from "next/link";

export default function OnlineColumn({ className }: { className?: string }) {
    const userInfo = useStoreSelector(state => state.userInfo);

    return <Link href={`http://sxz.school.zykj.org/navPage.html?apiHost=http://sxz.api.zykj.org&apiToken=${userInfo.accessToken}&timeStamp=${Date.now()}`}>
       在线专栏 
    </Link>
}