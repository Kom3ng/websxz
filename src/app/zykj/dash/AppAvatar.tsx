"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { useStoreDispatch } from "@/store";
import { loginInfoSlice, userInfoSlice } from "@/store/userInfo";
import { UserInfo } from "@/utils/api/zykj"
import { api } from "@/utils/api/zykj/apiInstance"
import { AvatarImage } from "@radix-ui/react-avatar";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function AppAvatar() {
    const [userInfo, setUserInfo] = useState<UserInfo>({});
    const dispatch = useStoreDispatch();
    const router = useRouter();

    useEffect(() => {
        api.manageApi.getInfo().then(res => {
            if (res.data.result) {
                setUserInfo(res.data.result || {});
            }
        })
    }, []);

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Avatar>
                        <AvatarImage src={userInfo.photo || '/favicon.ico'} alt="avatar" />
                        <AvatarFallback>{userInfo.name}</AvatarFallback>
                    </Avatar>
                </TooltipTrigger>

                <TooltipContent>
                    <Button className="m-4" onClick={() => {
                        dispatch(userInfoSlice.actions.setUserInfo({}))
                        dispatch(loginInfoSlice.actions.clear())
                        router.push('/zykj/login')
                    }}>登出</Button>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}