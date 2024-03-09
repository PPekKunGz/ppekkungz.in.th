
import { DrawerDemo } from "@/components/pages/Drawer";
import Lang from "@/components/pages/Lang";
import Skills from "@/components/pages/Skills";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"


export default function SkillsH() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 ">
      <h1 className="lg:text-[50px] text-[21px] font-bold underline decoration-white/20 decoration-dotted uppercase
            [text-shadow:2px_2px_2px_rgba(255,255,255,0.6)] tracking-[4px]">Skills / Language</h1>
      <Lang />
      <div className="mt-5 mb-5">
        <DrawerDemo/>
      </div>
      <Skills />
    </main>
  )
}