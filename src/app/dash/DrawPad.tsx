'use client'
import dynamic from 'next/dynamic';
import { useTheme } from "antd-style";
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import { Children, ReactNode } from 'react';

const Excalidraw = dynamic(
    async () => (await import("@excalidraw/excalidraw")).Excalidraw,
    {
      ssr: false,
    },
  );

export default function DrawPad({ exalidrawApi, children }: { exalidrawApi: ((api: ExcalidrawImperativeAPI) => void), children?: ReactNode }){
    const theme = useTheme();

    return <Excalidraw excalidrawAPI={exalidrawApi} langCode="zh-CN" theme={theme.isDarkMode ? 'dark' : 'light'} >
        {children}
    </Excalidraw>
}