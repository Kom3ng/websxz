"use client"
import { store, useStoreSelector } from "@/store";
import { loginInfoSlice, userInfoSlice } from "@/store/userInfo";
import { api } from "@/utils/api/zykj/apiInstance";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ClientInitlizer() {
    const token = useStoreSelector(state => state.userInfo.accessToken);
    if (token) {
        api.updateToken(token);
    }

    const router = useRouter();

    axios.interceptors.response.use(
        response => response,
        async error => {
            if (error.response && error.response.status === 401) {
                if (error.config.url?.includes("/TokenAuth/RefreshToken")) {
                    router.push(`/login?from=${window.location.pathname}`);
                    return Promise.reject("登陆过期");
                }
                const userInfo = store.getState().userInfo;
                const tokenLast = userInfo.expireInSeconds * 1000;
                const refreshTokenLast = userInfo.refreshTokenExpireInSeconds * 1000;
                const now = new Date().getTime();
                const loginAt = store.getState().loginStatus.loginAt;

                if (now - loginAt > refreshTokenLast) {
                    router.push(`/login?from=${window.location.pathname}`);
                    return Promise.reject("登陆过期");
                }

                if (now - loginAt > tokenLast) {
                    const resp = await api.manageApi.tokenAuthRefreshTokenPost(userInfo.refreshToken);
                    if (resp.data.error || !resp.data.result) {
                        return Promise.reject(resp.data.error?.message);
                    }
                    store.dispatch(userInfoSlice.actions.setUserInfo({
                        ...userInfo,
                        token: resp.data.result.accessToken,
                        expireInSeconds: resp.data.result.expireInSeconds,
                        refreshToken: resp.data.result.refreshToken,
                        refreshTokenExpireInSeconds: resp.data.result.refreshExpireInSeconds
                    }));
                    store.dispatch(loginInfoSlice.actions.login());
                    api.updateToken(resp.data.result.accessToken || '');

                    return axios.request(error.config);
                }

                router.push(`/login?from=${window.location.pathname}`);
                return Promise.reject("登陆过期");
            }

            return Promise.reject(error);
        }
    )
    return (<></>)
}