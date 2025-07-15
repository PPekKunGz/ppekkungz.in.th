"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Clock, MoreHorizontal } from "lucide-react"
import { useState, useEffect } from "react"

interface Track {
  id: string
  userId: string
  listenCount: number
  listeningTime: number
  lastPlayed: string
  trackName: string
  artist: string
  album: string
  albumImage?: string | null
  smallImage?: string | null
  rawAssets?: {
    largeText?: string
    smallText?: string | null
    largeImage?: string
    smallImage?: string | null
  }
}

export function RecentlyPlayed() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTracks()
  }, [])

  const fetchTracks = async () => {
    try {
      const response = await fetch("/api/tracks")
      const data = await response.json()

      // Transform the nested data structure
      const transformedTracks: Track[] = []

      for (const userId in data) {
        for (const trackId in data[userId]) {
          const trackData = data[userId][trackId]
          transformedTracks.push({
            id: trackId,
            userId: userId,
            listenCount: trackData.listenCount,
            listeningTime: trackData.listeningTime,
            lastPlayed: trackData.lastPlayed,
            trackName: trackData.trackName,
            artist: trackData.artist,
            album: trackData.album,
            albumImage: trackData.albumImage,
            smallImage: trackData.smallImage,
            rawAssets: trackData.rawAssets,
          })
        }
      }

      // Sort by lastPlayed (most recent first)
      transformedTracks.sort((a, b) => new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime())

      setTracks(transformedTracks.slice(0, 10)) // Show only top 10
    } catch (error) {
      console.error("Failed to fetch tracks:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateTrack = async (trackId: string, userId: string, listeningTime = 5) => {
    try {
      const response = await fetch(`/api/track/${userId}/${trackId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listeningTime }),
      })
      const data = await response.json()
      console.log("Track updated:", data)

      // Refresh the tracks list
      fetchTracks()
    } catch (error) {
      console.error("Failed to update track:", error)
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`
    } else {
      return `${secs}s`
    }
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const played = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - played.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) {
      return "Just now"
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      return `${hours} hour${hours > 1 ? "s" : ""} ago`
    } else {
      const days = Math.floor(diffInMinutes / 1440)
      return `${days} day${days > 1 ? "s" : ""} ago`
    }
  }

  const getSpotifyImageUrl = (spotifyUri: string | undefined) => {
    if (!spotifyUri || !spotifyUri.startsWith("spotify:")) return null
    // Convert spotify:ab67616d0000b273700f7bf79c9f063ad0362bdf to actual URL
    const imageId = spotifyUri.replace("spotify:", "")
    return `https://i.scdn.co/image/${imageId}`
  }

  if (loading) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
            <Clock className="w-5 h-5" />
            Recently Played
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg animate-pulse">
                <div className="w-6 sm:w-8 h-4 bg-white/10 rounded"></div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-white/10 rounded w-3/4"></div>
                  <div className="h-3 bg-white/10 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
          <Clock className="w-5 h-5" />
          Recently Played
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {tracks.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No tracks played yet</p>
            </div>
          ) : (
            tracks.map((track, index) => (
              <div
                key={`${track.userId}-${track.id}`}
                className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg hover:bg-white/5 group transition-colors"
              >
                <div className="w-6 sm:w-8 text-white/60 text-sm shrink-0">{index + 1}</div>

                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded overflow-hidden flex items-center justify-center shrink-0">
                  {track.rawAssets?.largeImage ? (
                    <img
                      src={getSpotifyImageUrl(track.rawAssets.largeImage) || "/placeholder.svg?height=48&width=48"}
                      alt={track.album}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = "none"
                        target.nextElementSibling?.classList.remove("hidden")
                      }}
                    />
                  ) : null}
                  <Play
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-white/60 ${track.rawAssets?.largeImage ? "hidden" : ""}`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium text-sm sm:text-base truncate">{track.trackName}</h4>
                  <p className="text-white/60 text-xs sm:text-sm truncate">{track.artist}</p>
                </div>

                {/* Desktop-only columns */}
                <div className="text-white/60 text-sm hidden lg:block truncate max-w-32">
                  {track.rawAssets?.largeText || track.album}
                </div>

                <div className="text-white/60 text-sm hidden xl:block whitespace-nowrap">
                  {getTimeAgo(track.lastPlayed)}
                </div>

                {/* Always visible stats */}
                <div className="text-white/60 text-xs sm:text-sm whitespace-nowrap">
                  {track.listenCount} play{track.listenCount !== 1 ? "s" : ""}
                </div>

                <div className="text-white/60 text-xs sm:text-sm hidden sm:block whitespace-nowrap">
                  {formatTime(track.listeningTime)}
                </div>

                {/* Action buttons - show on hover for desktop, always visible on mobile */}
                <div className="opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 shrink-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white/60 hover:text-white h-8 w-8 p-0"
                    onClick={() => updateTrack(track.id, track.userId, 0)}
                    title="New Play"
                  >
                    <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white/60 hover:text-white h-8 w-8 p-0"
                    onClick={() => updateTrack(track.id, track.userId, 30)}
                    title="Add 30s"
                  >
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white/60 hover:text-white h-8 w-8 p-0 hidden sm:flex"
                    title="More options"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
