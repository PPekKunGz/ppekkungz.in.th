"use client";

import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "../magicui/interactive-grid-pattern";
import Image from "next/image";
import Link from "next/link";

export function InteractiveGridPatternUI() {
    return (
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
            <InteractiveGridPattern
                className={cn(
                    "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                )}
                width={20}
                height={20}
                squares={[80, 80]}
                squaresClassName="hover:fill-blue-500"
            />
            <Image src={'https://cdn-dms.mckimkung.in.th/1i4nfi1sr/DimensionPortalFull.png'} alt={'dimension studio'} width={250} height={250} draggable="false" className='absolute opacity-60 rounded-xl' />
            <Link href={'https://dimension-studio.net'} target="_blank" className="absolute bottom-7 rounded-full opacity-60 px-4 py-2 text-xl bg-purple-500 font-medium font-clash hover:scale-105 duration-500">Dimension Studio</Link>
        </div>
    );
}
