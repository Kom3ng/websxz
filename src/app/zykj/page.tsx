import Link from "next/link";

export default function Page() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gray-400">
            <div className="px-20 space-y-4">
                <div className="h-20"></div>
                <p className="text-5xl font-bold">Zykj</p>
                <p className="text-3xl font-bold">主页没写<Link href='/zykj/dash'>点这里先去dash吧</Link></p>
            </div>
        </div>
    )
}