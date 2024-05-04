import FloatButtons from "@/app/zykj/FloatButtons";
import ClientInitlizer from "./ClientInitlizer";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";


export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Layout>
            <Content className="min-h-screen">
                <ClientInitlizer />

                {children}
            </Content>
        </Layout>
    );
}
