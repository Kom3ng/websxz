import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AppHeader from "./AppHeader";
import { JetBrains_Mono, Oswald } from "next/font/google";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
});
const oswald = Oswald({ subsets: ['latin'] });



export default function Home() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <div className="space-y-10 px-8">
        <div className="space-y-5 mt-8">
          <p className="text-7xl font-bold">一些介绍...(?)</p>
          <p>内容还没想好?</p>
        </div>

        <div className="">
          <h1 className="font-bold">功能</h1>
        </div>


        <Card className="px-8">
          <CardHeader>中育软件Web实现</CardHeader>
          <CardContent>
            <p>一些介绍?</p>
          </CardContent>
        </Card>


        <div className="space-y-5">
          <h1 className="font-bold">贡献</h1>
          <p>在<a target="_blank" href="https://github.com/kom3ng/websxz">github</a>上提交pr</p>
        </div>
      </div>
      <footer className="text-center">
        <p>Maintained by <a target="_blank" href="https://github.com/kom3ng">Astrack</a></p>
        <p>MIT License {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
