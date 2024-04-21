'use client'
import { useStoreDispatch, useStoreSelector } from "@/store";
import { appearenceSettingsSlece } from "@/store/settings";
import { ThemeProvider } from 'antd-style';
import { JetBrains_Mono, Ubuntu_Mono } from "next/font/google";

const jetBrainsMono = Ubuntu_Mono({
  subsets: ["latin"],
  weight: '400'
});

const setTailwindTheme = (mode: string) => {
  if (mode !== 'dark') {
    document.documentElement.classList.remove('dark')
  } else {
    document.documentElement.classList.add('dark')
  }
}


export default function ThemeConfigProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let themeMode = useStoreSelector(state => state.appearenceSettings.themeMode);
  const dispatch = useStoreDispatch();
  setTailwindTheme(themeMode);
  return (
    <ThemeProvider
      defaultThemeMode={'auto'}
      onThemeModeChange={(mode) => {
        themeMode = mode;
        setTailwindTheme(mode);
        dispatch(appearenceSettingsSlece.actions.setThemeMode(mode))
      }}
      themeMode={themeMode}
      theme={{
        token: {
          fontFamily: jetBrainsMono.style.fontFamily
        }
      }}
    >
      {children}
    </ThemeProvider>
  )
}