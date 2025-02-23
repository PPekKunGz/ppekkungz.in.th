"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { ThemeToggle } from "../_components/theme-toggle"
import Image from "next/image"

export default function Header() {
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navigation = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Projects", href: "/projects" },
        { name: "Contact", href: "/contact" },
    ]

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
            <div className={cn( "transition-all duration-300 ease-in-out py-4 w-full", scrolled && "py-4 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%]", )} >
                <div className={cn( "transition-all duration-300 ease-in-out", "border-border/40 ", scrolled ? "rounded-full border px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "px-4 md:px-8", )}>
                    <nav className="flex h-12 items-center justify-between">
                        <Link href="/" className="flex items-center text-xl font-semibold tracking-tight">
                            <Image src={"/avatar.png"} alt="Avatar @PPekKunGz" draggable="false" width={40} height={40} className="lg:block hidden"/>
                        </Link>

                        <div className="flex items-center gap-6 md:gap-8">
                            {navigation.map((item) => (
                                <Link key={item.name} href={item.href} className={cn(
                                        "relative text-sm transition-colors hover:text-foreground/80",
                                        pathname === item.href ? "text-foreground font-clash font-medium" : "text-foreground/80 font-clash font-light",
                                    )}>
                                    {pathname === item.href && (
                                        <span className="absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-green-500" />
                                    )}
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        <ThemeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )
}

