import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const appearenceSettingsSlece = createSlice({
    name: 'appearenceSettings',
    initialState: {
        themeMode: 'auto'
    },
    reducers: {
        setThemeMode(state, action: PayloadAction<string>) {
            state.themeMode = action.payload
        }
    }
})