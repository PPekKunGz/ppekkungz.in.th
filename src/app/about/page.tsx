import Link from "next/link";
import { FaGithub, FaYoutube, FaDonate } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ReactSkinview3d from "react-skinview3d";

export default function About() {
    return (
        <div className="lg:flex justify-center items-center h-screen pt-3">
            <div className="flex justify-center">
                <ReactSkinview3d
                    skinUrl="32338eb74a7b4fc9de999807afde860dc8780f07.png"
                    capeUrl="cape_b4acb3ba0ca9d89e996928e21fad42c5.png"
                    height="600"
                    width="600"
                />
            </div>
            <div className="flex flex-col lg:max-w-[600px] items-center mx-9 lg:mx-0 lg:ml-8 mt-7">
                <div className="flex flex-col justify-center text-start text-white">
                    <p className="text-4xl font-extrabold text-nowrap underline decoration-blue-200 tracking-[5px] flex lg:pl-0 lg:mb-0 pl-28 mb-5">PPEKKUNGZ</p>
                    <p className="text-xl">สวัสดี! นี่คือหน้าแนะนำตัวของ <b className="">@PPekKunGzDev</b> <br />
                        มาทำความรู้จักกันนะ ผมมีชื่อจริงๆว่า <b>"เพ็ก"</b> นะครับผม! <br />
                        สามารถรับชมหรือช่องทางการติดต่อ ได้ทั้งหมดที่ด้านล่างเลย!!</p>
                </div>
                <div className="flex justify-center mt-2 gap-3">
                    <Link href="https://x.com/PPekKunGzDev" target="_blank" className="p-2 rounded-full text-white hover:text-white cursor-pointer hover:scale-110 transition-all duration-300">
                        <FaXTwitter size="30" />
                    </Link>
                    <Link href="https://www.github.com/PPekKunGz" target="_blank" className="p-2 rounded-full text-white hover:text-[#fff] cursor-pointer hover:scale-110 transition-all duration-300">
                        <FaGithub size="30" />
                    </Link>
                    <Link href="https://www.youtube.com/@PPekKunGzChannel" target="_blank" className="p-2 rounded-full text-white hover:text-red-600 cursor-pointer hover:scale-110 transition-all duration-300">
                        <FaYoutube size="30" />
                    </Link>
                    <Link href="https://tipme.in.th/ppekkungzchannel" target="_blank" className="p-2 rounded-full text-white hover:text-orange-300 cursor-pointer hover:scale-110 transition-all duration-300">
                        <FaDonate size="30" />
                    </Link>
                </div>
            </div>
        </div>
    )
}