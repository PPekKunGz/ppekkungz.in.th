import MarqueeTech from "@/components/_components/marquee-tech";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center relative">
        <h1 className="relative text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          <span className="block text-primary relative z-10 [text-shadow:_0px_-1px_2px_#ffffff]">@PPekKunGzDev</span>
        </h1>
        <span className="block text-lg font-medium text-muted-foreground/60 tracking-tight">Chief Executive Officer of Dimension Studio</span>
        {/* <p className="mx-auto max-w-md text-base text-muted-foreground sm:text-lg md:max-w-3xl md:text-xl">
          this my personal website, you can learn more about me and my work here.
        </p> */}
        <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center">
          <div className="rounded-md shadow">
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/about" className="text-secondary">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/contact">
                Contact Us
                <Zap className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
