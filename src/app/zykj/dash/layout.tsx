import React from "react";
import AppHeader from "./Header";

export default function DashLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <div className="min-h-screen">
            <AppHeader />
            <div>{children}</div>
        </div>
    )
}