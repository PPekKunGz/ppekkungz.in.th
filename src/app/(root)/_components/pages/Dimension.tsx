import Link from "next/link";
import Image from "next/image";

export default function Dimension() {
    return (
        <div className="lg:flex justify-center items-center h-full mt-20 mb-20 pt-3">
          <div className="flex justify-center">
            <Image
              src="https://dms-api-gateway.mckimkung.in.th/public/dimension/image/img/DimensionPortalFire.png"
              alt=""
              width={580}
              height={580}
              className="scale-150"
            />
          </div>
          <div className="flex justify-center lg:max-w-[500px] lg:mx-0 mx-9 mt-7">
            <div className="flex flex-col justify-center text-start text-white">
              <p className="text-4xl font-extrabold text-nowrap">Dimension Studio</p>
              <p className="text-xl">Dimension Studio เป็นทีมรับงานทำเกี่ยวกับมายคราฟหรืออื่นสามารถดูผลงานหรือติดต่อได้ที่</p>
              <div className="flex justify-center text-center pt-2 text-3xl">
                <Link className="bg-yellow-300 px-4 py-2 rounded-xl font-bold cursor-pointer text-teal-950 hover:shadow-[0px_8px_rgba(202,138,4,1)] transition-all duration-200 border-solid border-[3px] border-yellow-600 hover:border-yellow-600 hover:translate-y-[4px]" href="https://dimension-studio.net" target="_blank">
                  เว็บไซต์
                </Link>
              </div>
            </div>
          </div>
        </div>
    )
  }
  