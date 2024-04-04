"use client"
import { Store, configureStore } from "@reduxjs/toolkit";
import { loginStatusSlice, userInfoSlice } from "./userInfo";
import { useDispatch, useSelector } from "react-redux";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from "redux-persist/lib/storage";

export const store: Store = configureStore({
    reducer: {
        userInfo: persistReducer({
            key: 'userInfo',
            storage,
        }, userInfoSlice.reducer),
        loginStatus: persistReducer({
            key: 'loginStatus',
            storage,
        }, loginStatusSlice.reducer),
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export const useStoreSelector = <TSelected>(selector: (state: ReturnType<typeof store.getState>) => TSelected) => useSelector(selector);
export const useStoreDispatch = () => useDispatch<typeof store.dispatch>();