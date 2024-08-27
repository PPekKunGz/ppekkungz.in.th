import Link from "next/link";
import ppekkungz from "../../../config/ppekkungz.json";
import Image from "next/image";
import Dimension from "../_components/pages/Dimension";

interface dataInterface {
    name: string
    img: string
    link: string
    data: string
    date: string
}

export default function Work() {
    const data = ppekkungz;
    return (
        <div className="flex flex-col pt-24 pb-10" data-aos="fade-up" data-aos-duration="2000">
            <div className="flex justify-center pt-4 h-full w-full">
                <div className="flex flex-wrap gap-4 px-5 justify-center">
                    {
                        data.map((data, index) => {
                            return (
                                // <div key={index} className="bg-white/10 border border-white/10 p-5 rounded-2xl w-fit h-fit">
                                <div key={index} className="bg-gradient-to-b from-black/10 to-white/10 border-[1.8px] border-white/30 p-5 backdrop-blur-sm rounded-2xl w-fit h-fit">
                                    <div className="flex justify-center">
                                        <Image
                                            src={data.image}
                                            alt=""
                                            width={250}
                                            height={250}
                                            draggable="false"
                                            className="overflow-clip scroll-area bg-cover bg-center h-[230px] rounded-lg"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-start gap-1 py-1 mt-2">
                                        <p className="text-white text-xl font-medium">{data.name}</p>
                                        <p className="text-sm text-muted-foreground font-medium">{data.desc}</p>
                                        {/*<p className="text-white text-xl font-medium">{data.name}</p>
                                    <p className="text-white text-xl font-medium">{data.name}</p> */}
                                    </div>
                                    <div className="flex flex-col gap-2 mt-4 w-fit">
                                        <Link href={data.link} target="_blank" className="w-fit text-sm bg-black/20 py-1 px-5 rounded-lg text-white hover:text-white/80 transition-all duration-300 cursor-pointer">รายละเอียด</Link>
                                        <div className="w-fit text-sm bg-black/20 py-1 px-2 rounded-lg text-white hover:text-white/80 transition-all duration-300 cursor-pointer">{data.lang1}</div>
                                        <div className="flex">
                                            <div className="text-sm bg-black/20 py-1 px-2 rounded-lg text-white hover:text-white/80 transition-all duration-300 cursor-pointer">{data.lang2}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="mt-5" />
            <div id="Dimension">
                <Dimension />
            </div>
        </div>
    )
}






// "use client"
// import React, { useEffect, useState } from 'react';
// import ArticleCard from '../../../components/articlecard';
// import ppekkungz from "../../../config/ppekkungz.json";
// import Dimension from '../_components/pages/Dimension';

// interface ArticleCardProps {
//     name: string;
//     date: string;
//     desc: string;
//     image: string;
//     lang1: string;
//     lang2: string;
//     author: string;
//     link: string;
// }

// export default function Blog() {
//     const data = ppekkungz;
//     const [isLoading, setIsLoading] = useState(true);

//     setTimeout(() => {
//         setIsLoading(false);
//     }, 2000);
//     return (
//         <>
//             {isLoading ? (
//                 <div className="flex items-center justify-center h-screen">
//                     <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
//                 </div>
//             ) : (
//                 <div className="min-h-screen h-full container mx-auto pt-24 p-6">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         {data.map((data: any, index: number) => (
//                             <div key={index}>
//                                 <ArticleCard
//                                     image={data.image}
//                                     name={data.name}
//                                     author={data.author}
//                                     date="Date 00, 2020"
//                                     desc={data.desc}
//                                     link={data.link}
//                                     lang1={data.lang1}
//                                     lang2={data.lang2}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                     <div className="mt-5" />
//                     <div id="Dimension">
//                         <Dimension />
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };