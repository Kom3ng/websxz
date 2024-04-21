import { Card, Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useTheme } from "antd-style";
import AppHeader from "./AppHeader";
import Link from "next/link";
import { JetBrains_Mono, Oswald } from "next/font/google";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
});
const oswald = Oswald({ subsets: ['latin'] });



export default function Home() {
  return (
    <Layout className="min-h-screen">
      <AppHeader />
      <Content className="space-y-10 px-8">
        <div className="space-y-5 mt-8">
          <p className="text-7xl font-bold">一些介绍...(?)</p>
          <p>内容还没想好?</p>
        </div>

        <div className="">
          <h1 className="font-bold">功能</h1>
        </div>

        <div className="">
          <Card className="px-8" title='中育软件Web实现'>
            <p>一些介绍?</p>
          </Card>
        </div>

        <div className="space-y-5">
          <h1 className="font-bold">贡献</h1>
          <p>在<a target="_blank" href="https://github.com/kom3ng/websxz">github</a>上提交pr</p>
        </div>
      </Content>
      <Footer className="text-center">
        <p>Maintained by <a target="_blank" href="https://github.com/kom3ng">Astrack</a></p>
        <p>MIT License {new Date().getFullYear()}</p>
      </Footer>
    </Layout>
  );
}
