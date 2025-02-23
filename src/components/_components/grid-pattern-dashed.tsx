"use client"

import { cn } from "@/lib/utils"
import { GridPattern } from "@/components/magicui/grid-pattern"

export default function GridPatternDashed() {
  return (
    <div className="fixed inset-0 z-0">
      <GridPattern
        width={50}
        height={50}
        x={-1}
        y={-1}
        strokeDasharray={"4 0"}
        className={cn(
          "absolute inset-0 h-full w-full",
          "fill-gray-400/30 stroke-gray-400/30",
          "dark:fill-gray-800/30 dark:stroke-gray-800/30",
          "[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]",
        )}
      />
    </div>
  )
}

