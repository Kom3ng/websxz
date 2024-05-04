import AppAvatar from "./AppAvatar";
import Link from "next/link";
import OnlineColumn from "./OnlineColumn";



export default function AppHeader() {
    return (
        <nav className="flex justify-between items-center min-h-16 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex space-x-4 ml-8">
                    <div>
                        <Link href="/zykj/dash/task">Task</Link>
                    </div>
                    <div>
                        <OnlineColumn />
                    </div>
                </div>
                <div className="mr-8">
                    <AppAvatar />
                </div>
            </nav>
    )
}