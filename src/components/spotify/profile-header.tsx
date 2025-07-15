"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Music, Play } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export function ProfileHeader() {
  const userId = "PPEKKUNGZDEV"
  const date = new Date().getFullYear()
  var activeListener = "https://open.spotify.com/playlist/37i9dQZF1DXcuR8Y8HEMxS?si=f92f6293e57942d1"
  var accountImg = "https://i.scdn.co/image/ab6775700000ee85bc305b4b6e4ba9f717b0b950"
  var account = "https://open.spotify.com/user/fw4lilxaose66mh9mwbv95m6v?si=3292a2adcbbb4eda"
  
  return (
    <div className="px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
        <Link href={account} target="_blank">
          <Avatar className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 border-4 border-white/20 shrink-0">
            <AvatarImage src={accountImg || "/placeholder.svg"} />
            <AvatarFallback className="bg-green-600 text-white text-2xl sm:text-3xl lg:text-4xl">
              <Image src={accountImg ? accountImg : "undefined"} width={256} height={256} alt="Profile" draggable={false} />
              {!userId && <User className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16" />}
            </AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex-1 space-y-2 text-center sm:text-left">
          <Badge variant="outline" className="border-white/30 text-white/80 bg-black/20">
            Profile
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 break-all sm:break-normal">{userId}</h1>
          <p className="text-white/70 text-sm sm:text-base">A song to vibe with life and coding.</p>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-white/60 text-xs sm:text-sm mt-4">
            <div className="flex items-center gap-1">
              <Music className="w-4 h-4" />
              <span>Listening since {date}</span>
            </div>
            <Link href={activeListener} target="_blank" className="flex items-center gap-1 hover:text-white/80 transition-colors">
              <Play className="w-4 h-4" />
              <span>Active listener</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
