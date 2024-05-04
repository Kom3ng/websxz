import GithubLink from "./GithubLink";
import Link from "next/link";

export default function AppHeader() {
    return (
        <nav className="flex justify-between items-center min-h-16 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex space-x-4 items-center ml-8">
                <div className="felx items-center">
                    <p className="text-3xl font-bold">WebSxz</p>
                </div>
                <div>
                    <Link href='/zykj'>中育</Link>
                </div>
            </div>
            <div className="flex items-center mr-8">
                <GithubLink />
            </div>
        </nav>
    );
}