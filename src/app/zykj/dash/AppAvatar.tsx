import { useStoreDispatch } from "@/store";
import { loginInfoSlice, userInfoSlice } from "@/store/userInfo";
import { UserInfo } from "@/utils/api/zykj"
import { api } from "@/utils/api/zykj/apiInstance"
import { Avatar, Button, List, Popover } from "antd"
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function AppAvatar(){
    const [userInfo, setUserInfo] = useState<UserInfo>({});
    const dispach = useStoreDispatch();
    const router = useRouter();

    api.manageApi.getInfo().then(res => {
        if(res.data.result){
            setUserInfo(res.data.result ?? {})
        }
    })
    
    return (
        <Popover
        //    title={userInfo.realName ?? ''}
            content={<>
                <Button onClick={() => {
                    dispach(userInfoSlice.actions.setUserInfo({}))
                    dispach(loginInfoSlice.actions.clear())
                    router.push('/zykj/login')
                }} type='primary'>登出</Button>
            </>}
        >
            <Avatar src={userInfo.photo ?? ''}/>
        </Popover>
    )
}