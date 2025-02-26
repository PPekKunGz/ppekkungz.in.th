"use client";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import AOS from 'aos';

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function AppProvider({ children }: MainLayoutProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        AOS.init();
      }, []);

    if (!mounted) return null;
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
        </ThemeProvider>
    );
}