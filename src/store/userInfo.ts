"use client"
import { Login200ResponseResult } from "@/utils/api/zykj";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

class UserInfo implements Login200ResponseResult{}

const initialState: UserInfo = {}


export const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<Login200ResponseResult>) => {
            return action.payload;
        },
    },
});

export const loginInfoSlice = createSlice({
    name: "loginInfo",
    initialState: {
        username: "",
        password: "",
        autoLogin: false,
        loginAt: 0,
    },
    reducers: {
        saveLoginInfo(state, action: PayloadAction<{ username: string, password: string }>){
            state.username = action.payload.username;
            state.password = action.payload.password;
            state.autoLogin = true;
        },
        stopAutoLogin(state){
            state.autoLogin = true;
        },
        login(state) {
            state.loginAt = Date.now();
        },
        clear(state) {
            state.username = "";
            state.password = "";
            state.autoLogin = false;
            state.loginAt = 0;
        }
    }
})