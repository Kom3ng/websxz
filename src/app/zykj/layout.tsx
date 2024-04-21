import FloatButtons from "@/app/zykj/FloatButtons";
import ClientInitlizer from "./ClientInitlizer";


export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <ClientInitlizer />
            <FloatButtons />
            {children}
        </>
    );
}
