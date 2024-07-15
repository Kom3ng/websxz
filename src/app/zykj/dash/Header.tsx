"use client"

import AppAvatar from "./AppAvatar";
import Link from "next/link";
import OnlineColumn from "./OnlineColumn";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";



export default function AppHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <NavigationMenu>
                    <NavigationMenuList className="space-x-4">
                        <NavigationMenuItem>
                            <Link href="/zykj/dash/mistake" passHref legacyBehavior>
                                <NavigationMenuLink  className={navigationMenuTriggerStyle()}>错题本</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/zykj/dash/task" passHref legacyBehavior>
                                <NavigationMenuLink  className={navigationMenuTriggerStyle()}>新测评</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem  className={navigationMenuTriggerStyle()}>
                            <OnlineColumn></OnlineColumn>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <AppAvatar />
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
        </header>
    )
}