"use client"
import { usePathname } from "next/navigation";
import { InteractiveGridPatternUI } from "../_components/grid-pattern-interactive";

export default function Footer() {
    var date = new Date();
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    return (
        <div className="mt-2 w-full flex flex-col items-center justify-center">
            {isHomePage && (
                <div className="lg:w-2/6 w-full">
                    <InteractiveGridPatternUI />
                </div>
            )}
            <footer className={`w-full text-primary py-4 text-center text-sm border-t border-white/20 px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60`}>
                <p>© 2024-{date.getFullYear()} <span className="text-orange-400">เว็ปไซต์เก็บพอร์ตของ @PPekKunGzDev</span>. All rights reserved.</p>
            </footer>
        </div>
    )
}