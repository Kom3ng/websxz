import ClientInitlizer from "./ClientInitlizer";


export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div className="min-h-screen">
            <ClientInitlizer />

            {children}
        </div>

    );
}
