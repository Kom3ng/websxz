import { useTheme } from "next-themes"

const useDarkMode = () => {
    const { theme, systemTheme }  = useTheme();

    if (theme === "system") {
        return systemTheme === "dark";
    }

    return theme === "dark";
}