import MarqueeTech from '@/components/_components/marquee-tech'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import { SparklesText } from '@/components/magicui/sparkles-text'
import { SpinningText } from '@/components/magicui/spinning-text'
import { Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function page() {
    return (
        <div className="w-full h-full flex flex-col items-center mt-12">
            <div className="container flex flex-col justify-start space-y-6 mb-10 w-full" data-aos="fade-up" data-aos-duration="2000">
                <div className="flex items-center gap-2 text-emerald-400">
                    <div className="w-4 h-4">
                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 0L14.9282 4V12L8 16L1.07179 12V4L8 0Z" fill="currentColor" />
                        </svg>
                    </div>
                    <span className="text-sm font-medium tracking-wider">About me.</span>
                </div>
                <h1 className="text-xl font-medium tracking-wide">@PPekKunGzDev</h1>
            </div>
            <div className="hidden container mx-auto xl:grid grid-cols-2 grid-rows-2 gap-4">
                <div className="w-4/5 h-fit relative row-span-2" data-aos="fade-right" data-aos-duration="2500">
                    <Image src={"/Messenger_creation_2E2A59F1-8B15-4050-A13D-527C1527D2D8.jpeg"} alt="Avatar PPekKunGz" width={0} height={0} className="w-full object-cover rounded-b-full dark:bg-white bg-black shadow-md dark:shadow-white/50 shadow-black/50" />
                    <SpinningText className="absolute animate-gradient top-24 right-28 text-white">Copy • Paste • Deleted •</SpinningText>
                </div>
                <div className="bg-primary-foreground text-center space-y-5 text-primary p-5 rounded-tr-[3rem]" data-aos="fade-down" data-aos-duration="2500">
                    <div className="text-xl"><SparklesText text="Web Developer" sparklesCount={10} /></div>
                    <p className="text-start text-balance md:text-pretty font-clash font-medium">I am <b>PPekKunGz</b>, a <u>Frontend Developer</u> who enjoys creating websites and delivering great user experiences.
                        I am always eager to learn and improve myself.

                        In my free time, I enjoy being a Minecraft Developer. I love experimenting with mod creation and developing various systems in Minecraft servers to enhance the fun and uniqueness of the game.

                        Currently, I work at Dimension Studio, where I learn and collaborate with the team on exciting projects in the Minecraft Roleplay industry.</p>
                    <MarqueeTech />
                </div>
                <div className="col-start-2 row-start-2 h-fit bg-muted text-center space-y-5 text-primary p-5 rounded-br-[3rem]" data-aos="fade-up" data-aos-duration="2500">
                    <SparklesText text="Minecraft Developer" sparklesCount={10} />
                    <p className="text-start text-balance md:text-pretty font-clash font-medium">Can Check on my Github Profile and <Link href={"https://dimension-studio.net"} target="_blank" className="underline decoration-purple-400 decoration-2">Dimension Studio</Link> can Contact to Business.</p>
                    <div className="flex items-center gap-5">
                        <Link href={"https://dimension-studio.net"} target='_blank' className="bg-pink-300/40 dark:bg-zinc-700 flex flex-row items-center w-fit p-3 rounded-lg gap-2">
                            <Image src={"https://cdn-dms.mckimkung.in.th/1i4nfi1sr/DimensionPortalFull.png"} alt="" width={20} height={20} className="" />
                            <p className="font-clash font-medium">Dimension Studio</p>
                        </Link>
                        <Link href={"https://github.com/PPekKunGz"} target='_blank' className="bg-pink-300/40 dark:bg-zinc-700 flex flex-row items-center w-fit p-3 rounded-lg gap-2">
                            <Github />
                            <p className="font-clash font-medium">Github Profile</p>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="xl:hidden container p-2 mx-auto flex flex-col gap-4">
                <div className="bg-primary-foreground text-center space-y-3 text-primary p-3">
                    <div className="text-xl"><SparklesText text="Web Developer" sparklesCount={10} /></div>
                    <p className="text-start text-balance md:text-pretty font-clash font-medium">I am <b>PPekKunGz</b>, a <u>Frontend Developer</u> who enjoys creating websites and delivering great user experiences.
                        I am always eager to learn and improve myself.

                        In my free time, I enjoy being a Minecraft Developer. I love experimenting with mod creation and developing various systems in Minecraft servers to enhance the fun and uniqueness of the game.

                        Currently, I work at Dimension Studio, where I learn and collaborate with the team on exciting projects in the Minecraft Roleplay industry.</p>
                    <MarqueeTech />
                </div>
                <div className="h-fit bg-muted text-center space-y-3 text-primary p-5">
                    <SparklesText text="Minecraft Developer" sparklesCount={10} />
                    <p className="text-start text-pretty font-clash font-medium">Can Check on my Github Profile and <Link href={"https://dimension-studio.net"} target="_blank" className="underline decoration-purple-400 decoration-2">Dimension Studio</Link> can Contact to Business.</p>
                    <div className="flex items-center gap-5">
                        <div className="bg-pink-300/40 dark:bg-zinc-700 flex flex-row items-center w-fit p-3 rounded-lg gap-2">
                            <Image src={"https://cdn-dms.mckimkung.in.th/1i4nfi1sr/DimensionPortalFull.png"} alt="" width={20} height={20} className="" />
                            <p className="font-clash font-medium">Dimension Studio</p>
                        </div>
                        <div className="bg-pink-300/40 dark:bg-zinc-700 flex flex-row items-center w-fit p-3 rounded-lg gap-2">
                            <Github />
                            <p className="font-clash font-medium">Github Profile</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}