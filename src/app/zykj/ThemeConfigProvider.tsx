'use client'
import { useStoreDispatch, useStoreSelector } from "@/store";
import { appearenceSettingsSlece } from "@/store/settings";
import { ThemeProvider } from 'antd-style';

export default function ThemeConfigProvider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    let themeMode = useStoreSelector(state => state.appearenceSettings.themeMode);
    const dispatch = useStoreDispatch();

    return (
        <ThemeProvider 
          defaultThemeMode={'auto'}
          onThemeModeChange={(mode) => {
            themeMode = mode
            dispatch(appearenceSettingsSlece.actions.setThemeMode(mode))
          }}
          themeMode={themeMode}
        >
            {children}
        </ThemeProvider>
    )
  }