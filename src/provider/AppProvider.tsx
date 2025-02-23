"use client";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function AppProvider({ children }: MainLayoutProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    );
}