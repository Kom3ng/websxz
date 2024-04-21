'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "antd-style";

export default function GithubLink() {
    return (
        <a href="https://github.com/kom3ng/websxz" target="_blank" rel="noopener noreferrer">
            <Image src={ useTheme().isDarkMode ? "/github-mark-white.svg" : "/github-mark.svg" } alt="github" width={30} height={30} />
        </a>    
    );
}