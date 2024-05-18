'use client'
import { useStoreDispatch, useStoreSelector } from "@/store";
import { appearenceSettingsSlece } from "@/store/settings";
import { ThemeProvider } from 'antd-style';
import { JetBrains_Mono, Ubuntu_Mono } from "next/font/google";

const jetBrainsMono = Ubuntu_Mono({
  subsets: ["latin"],
  weight: '400'
});


export default function ThemeConfigProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      themeMode="auto"
      theme={{
        token: {
          fontFamily: 'inherit'
        }
      }}
    >
      {children}
    </ThemeProvider>
  )
}
