import Link from "next/link";

export default function Page() {
    return (
        <div className="">
            <div className="px-20 space-y-4">
                <div className="h-20"></div>
                <h1 className="text-5xl font-bold">Zykj</h1>
                <p className="text-3xl font-bold">主页没写<Link href='/zykj/dash'>点这里先去dash吧</Link></p>
            </div>
        </div>
    )
}