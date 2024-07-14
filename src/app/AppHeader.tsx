'use client'

import { NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import { useTheme } from "next-themes";

export default function AppHeader() {
    const { systemTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <NavigationMenu>
                    <NavigationMenuList className="space-x-4">
                        <NavigationMenuItem>
                            <h1 className="text-2xl font-bold">Web Sxz</h1>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/zykj" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    中育
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="https://github.com/kom3ng/websxz" target="_blank" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        <Image src={systemTheme === 'dark' ? "/github-mark-white.svg" : "/github-mark.svg"} alt="github" width={28} height={28} />
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
        </header>
    );
}