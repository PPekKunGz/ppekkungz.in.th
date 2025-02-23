import { SpinningText } from '@/components/magicui/spinning-text'
import Image from 'next/image'

export default function page() {
    return (
        <div className="w-full h-screen flex flex-col items-center mt-12">
            <div className="container mx-auto grid grid-cols-[35%_minmax(900px,_1fr)_100px] grid-rows-1 gap-4">
                <div className="">
                    <Image src={"/Messenger_creation_2E2A59F1-8B15-4050-A13D-527C1527D2D8.jpeg"} alt="Avatar PPekKunGz" width={0} height={0} className="w-full object-cover rounded-b-full dark:bg-white bg-black shadow-md dark:shadow-white/50 shadow-black/50"/>
                    {/* <SpinningText className="absolute ">learn more • earn more • grow more •</SpinningText> */}
                </div>
                <div className="">

                </div>
            </div>
        </div>
    )
}
