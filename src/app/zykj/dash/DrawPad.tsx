'use client'
import { useTheme } from "antd-style";
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import { ReactNode, useRef } from 'react';
import { Excalidraw, exportToBlob } from '@excalidraw/excalidraw';
import { Button } from "antd";

export default function DrawPad({ onExport }: { onExport: (blob: Promise<Blob>) => void;}){
  const theme = useTheme();
  const api = useRef<ExcalidrawImperativeAPI>(null!);

  return <Excalidraw 
         excalidrawAPI={(a) => api.current = a } 
         langCode="zh-CN" 
         theme={theme.isDarkMode ? 'dark' : 'light'} 
         renderTopRightUI={() => (<Button onClick={() => {
          if (!api) return;

          const blob = exportToBlob(
            {
                elements: api.current.getSceneElements(),
                appState: api.current.getAppState(),
                files: api.current.getFiles(),
                mimeType: 'image/webp'
            }
        )
          onExport(blob)
         }}>
            完成
         </Button>)}
         >
  </Excalidraw>
}
