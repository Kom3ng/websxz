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

export const loginStatusSlice = createSlice({
    name: "loginStatus",
    initialState: {
        loginAt: 0,
    },
    reducers: {
        login(state) {
            state.loginAt = Date.now();
        }
    }
})