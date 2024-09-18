import Image from "next/image";
import Link from "next/link"
import Head from "../../../../public/head.svg";

export default function header() {
  return (
      <header className="text-white text-center">
        <nav className="fixed w-full h-16 shadow-xl backdrop-blur-md bg-black/30 z-50">

        <div className="mx-auto max-w-7xl flex items-center justify-between px-3 h-full">
            <div className="flex text-center items-center text-xl ml-2">
              <Link href="/">
                <Image
                  src="favicon.ico"
                  alt="favicon.ico"
                  width={50}
                  height={50}
                  className="cursor-pointer rounded-md"
                />
              </Link>
              <div className="flex flex-row gap-2">
                <Link className="ml-5 cursor-pointer underline-animate relative" href="/">
                  หน้าหลัก
                </Link>
                <div className="hidden sm:flex gap-2">
                  <Link className="cursor-pointer underline-animate relative" href="/about"> 
                  แนะนำตัว
                  </Link>
                  <Link className="cursor-pointer underline-animate relative" href="/contents">
                  ผลงาน
                  </Link>
                  {/* <Link className="cursor-pointer underline-animate relative" href="/skills">
                  สกิล/ภาษา
                  </Link> */}
                </div>
                
              </div>
            </div>
            <Link className="text-xl cursor-pointer underline-animate relative" href="/contact">
              สถานะการใช้งาน
            </Link>
          </div>
          
        </nav>
    </header>
  )
}