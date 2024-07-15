import React from "react";

export default function DashLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
            <div className="container max-w-screen-2xl mt-5">{children}</div>
    )
}