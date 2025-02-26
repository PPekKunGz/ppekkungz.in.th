"use client"

import React from "react"
import { Sparkle } from "lucide-react";
import { Marquee } from "@/components/magicui/marquee";

const items = ["Mentor", "Websites", "Frontend", "Designing", "JavaScript", "TypeScript", "NextJS", "Java", "Mod Creator", "Flutter", "NodeJS", "ExpressJS", "MariaDB", ""] as const
type Item = (typeof items)[number]

export default function MarqueeTech() {
    return (
        <div className="bg-primary py-4">
            <hr />
            <Marquee pauseOnHover={false} className="[--gap:2rem] p-5 text-zinc-500 text-xl tracking-wider">
                <div className="flex items-center justify-center gap-8">
                    {items.map((item, index) => (
                        <React.Fragment key={item}>
                            <span className="font-medium font-clash text-4xl">{item}</span>
                            {index !== items.length - 1 && <span><Sparkle size={18} /></span>}
                        </React.Fragment>
                    ))}
                </div>
            </Marquee>
            <hr />
        </div>
    )
}

