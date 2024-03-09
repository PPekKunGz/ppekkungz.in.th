import Link from 'next/link';
import ppekkungz from '../../../public/data/ppekkungz.json';
import { FaCode } from "react-icons/fa";
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function PPekKunGz() {
    const data = ppekkungz;

    return (
        <div className='flex flex-auto lg:w-[1200px] sm:w-[400px] w-[350px] gap-5 flex-wrap justify-center' id='PPekKunGz'>
            {data.map((data, index) => (
                <div key={index} className='p-2'>
                    <div className="space-y-1">
                        <h4 className="text-[18px] font-medium leading-none flex justify-center mb-3">{data.name}</h4>
                        <p className="text-sm text-muted-foreground">
                            <img src={data.image} alt="Image" className='mb-2 rounded-sm w-[340px] h-[340px]' />
                            {data.desc}
                        </p>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex h-5 items-center space-x-4 text-sm">
                        <a href={data.link} target='_blank'><div>Link</div></a>
                        <Separator orientation="vertical" />
                        <AlertDialog>
                            <AlertDialogTrigger>Docs</AlertDialogTrigger>
                            <AlertDialogContent className='bg-[#050510]'>
                                <AlertDialogHeader>
                                  <AlertDialogTitle className='flex items-center uppercase tracking-widest gap-2 text-white font-bold underline decoration-blue-300 decoration-2'><FaCode color='#FF007ACC' size={22} /> {data.author}</AlertDialogTitle>
                                  <AlertDialogDescription className=''>
                                    <div className='mb-2'>{data.desc}</div>
                                    <div className='mb-2 font-bold'>&gt; Language to Coding</div>
                                    <Badge variant="secondary">{data.lang1}</Badge>&nbsp;
                                    <Badge variant="secondary">{data.lang2}</Badge>
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogAction>Close</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                        </AlertDialog>
                        <Separator orientation="vertical" />
                        <a href="/about"><div>Want ?</div></a>
                    </div>
                </div>
            ))}
        </div>
    )
}