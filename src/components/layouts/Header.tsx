"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { ThemeToggle } from "../_components/theme-toggle"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Header() {
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const mainNavigation = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Projects", href: "/projects" },
        { name: "Activity", href: "/activity" },
        //{ name: "Special Day", href: "/birthday" },
        { name: "Contact", href: "https://github.com/PPekKunGz" },
    ]

    const resNavigation = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" }
    ]

    const burgerNavigation = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Projects", href: "/projects" },
        //{ name: "Special Day", href: "/birthday" },
        { name: "Activity", href: "/activity" },
        { name: "Contact", href: "https://github.com/PPekKunGz" },
    ]

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
            <div className={cn("transition-all duration-300 ease-in-out py-4 w-full", scrolled && "py-4 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%]")}>
                <div className={cn("transition-all duration-300 ease-in-out", "border-border/40", scrolled ? "rounded-full border px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "px-4 md:px-8")}>
                    <nav className="flex h-12 items-center justify-between">
                        <Link href="/" className="flex items-center text-xl font-semibold tracking-tight">
                            <Image src={"/avatar.png"} alt="Avatar @PPekKunGz" draggable="false" width={40} height={40} className="md:block hidden"/>
                        </Link>

                        {/* Main Navigation - Always visible */}
                        <div className="md:flex hidden items-center gap-6 md:gap-8">
                            {mainNavigation.map((item) => (
                                <Link key={item.name} href={item.href} className={cn(
                                    "relative text-sm transition-colors hover:text-foreground/80 line-clamp-1",
                                    pathname === item.href ? "text-foreground font-clash font-medium" : "text-foreground/80 font-clash font-light",
                                )}>
                                    {pathname === item.href && (
                                        <span className="absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-green-500" />
                                    )}
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        <div className="md:hidden flex items-center gap-6 md:gap-8">
                            {resNavigation.map((item) => (
                                <Link key={item.name} href={item.href} className={cn(
                                    "relative text-sm transition-colors hover:text-foreground/80 line-clamp-1",
                                    pathname === item.href ? "text-foreground font-clash font-medium" : "text-foreground/80 font-clash font-light",
                                )}>
                                    {pathname === item.href && (
                                        <span className="absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-green-500" />
                                    )}
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                            
                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={cn(
                "fixed inset-0 z-40 md:hidden transition-transform duration-300 ease-in-out",
                isMenuOpen ? "translate-x-0" : "translate-x-full"
            )}>
                <div className="absolute inset-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" onClick={() => setIsMenuOpen(false)} />
                <div className="absolute right-0 top-0 h-full w-[75%] max-w-sm bg-background border-l">
                    <div className="flex flex-col p-6 gap-4">
                        {burgerNavigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={cn(
                                    "text-lg font-clash transition-colors hover:text-foreground/80",
                                    pathname === item.href ? "text-foreground font-medium" : "text-foreground/80 font-light"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    )
}

