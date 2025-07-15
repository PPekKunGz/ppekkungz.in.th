"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, SkipForward, Volume2, Heart } from 'lucide-react'
import { useEffect, useState } from "react"

interface NowPlayingData {
  trackId?: string
  trackName?: string
  artist?: string
  album?: string
  albumImage?: string
  smallImage?: string
  rawAssets?: {
    largeText?: string
    smallText?: string
    largeImage?: string
    smallImage?: string
  }
  isPlaying?: boolean
  timestamp?: string
}

export function NowPlaying() {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null)
  const [loading, setLoading] = useState(true)

  const getAlbumImage = (nowPlaying: NowPlayingData | null) => {
    if (!nowPlaying || !nowPlaying.rawAssets?.largeImage) return
    return nowPlaying.rawAssets.largeImage.replace("spotify:", "")
  }

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch("/api/nowplaying")
        const data = await response.json()
        setNowPlaying(data)
      } catch (error) {
        console.error("Failed to fetch now playing:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNowPlaying()
    const interval = setInterval(fetchNowPlaying, 5000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card className="bg-gradient-to-r from-green-900/20 to-green-800/20 border-green-500/20">
        <CardContent className="p-4 sm:p-6">
          <div className="animate-pulse flex flex-col sm:flex-row items-center gap-4">
            <div className="w-16 h-16 sm:w-16 sm:h-16 bg-white/10 rounded shrink-0"></div>
            <div className="flex-1 space-y-2 text-center sm:text-left w-full">
              <div className="h-4 bg-white/10 rounded w-3/4 mx-auto sm:mx-0"></div>
              <div className="h-3 bg-white/10 rounded w-1/2 mx-auto sm:mx-0"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-r from-green-900/20 to-green-800/20 border-green-500/20">
      <CardContent className="p-4 sm:p-6">
        {nowPlaying?.trackName ? (
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-16 h-16 sm:w-16 sm:h-16 bg-green-600/20 rounded flex items-center justify-center relative shrink-0">
              <Play className="absolute w-6 h-6 sm:w-8 sm:h-8 text-green-400/50" />
              <img 
                src={getAlbumImage(nowPlaying) ? "https://i.scdn.co/image/" + getAlbumImage(nowPlaying) : ""} 
                alt="Album" 
                className="w-full h-full object-cover rounded" 
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="text-xs text-green-400 uppercase tracking-wide">Now Playing</span>
                {nowPlaying.isPlaying && (
                  <div className="flex gap-1">
                    <div className="w-1 h-3 bg-green-400 rounded animate-pulse"></div>
                    <div
                      className="w-1 h-4 bg-green-400 rounded animate-pulse"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-1 h-2 bg-green-400 rounded animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white truncate">{nowPlaying.trackName}</h3>
              <p className="text-white/70 truncate">{nowPlaying.artist}</p>
              {nowPlaying.album && <p className="text-white/50 text-sm truncate">{nowPlaying.album}</p>}
            </div>

            <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-0">
              <Button size="sm" variant="ghost" className="text-white/60 hover:text-white h-8 w-8 p-0">
                <Heart className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white/60 hover:text-white h-8 w-8 p-0">
                <Play className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white/60 hover:text-white h-8 w-8 p-0">
                <SkipForward className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white/60 hover:text-white h-8 w-8 p-0">
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-white/60">
            <Play className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No track currently playing</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
