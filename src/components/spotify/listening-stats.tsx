"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Clock, Music, Calendar, TrendingUp } from "lucide-react"
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
}

interface Stats {
  totalTracks: number
  totalListeningTime: number
  averagePerDay: number
  topArtist: string
  thisWeek: {
    tracks: number
    time: number
    uniqueTracks: number
  }
  totalPlays: number
  averagePlayTime: number
}

export function ListeningStats() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/tracks")
      const data = await response.json()

      // Transform the nested data structure
      const tracks: Track[] = []

      for (const userId in data) {
        for (const trackId in data[userId]) {
          const trackData = data[userId][trackId]
          tracks.push({
            id: trackId,
            userId: userId,
            listenCount: trackData.listenCount,
            listeningTime: trackData.listeningTime,
            lastPlayed: trackData.lastPlayed,
            trackName: trackData.trackName,
            artist: trackData.artist,
            album: trackData.album,
          })
        }
      }

      // Calculate statistics
      const calculatedStats = calculateStats(tracks)
      setStats(calculatedStats)
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (tracks: Track[]): Stats => {
    if (tracks.length === 0) {
      return {
        totalTracks: 0,
        totalListeningTime: 0,
        averagePerDay: 0,
        topArtist: "None",
        thisWeek: { tracks: 0, time: 0, uniqueTracks: 0 },
        totalPlays: 0,
        averagePlayTime: 0,
      }
    }

    // Basic stats
    const totalTracks = tracks.length
    const totalListeningTime = tracks.reduce((sum, track) => sum + track.listeningTime, 0)
    const totalPlays = tracks.reduce((sum, track) => sum + track.listenCount, 0)
    const averagePlayTime = totalListeningTime / totalPlays

    // Find date range for average calculation
    const dates = tracks.map((track) => new Date(track.lastPlayed))
    const oldestDate = new Date(Math.min(...dates.map((d) => d.getTime())))
    const newestDate = new Date(Math.max(...dates.map((d) => d.getTime())))
    const daysDiff = Math.max(1, Math.ceil((newestDate.getTime() - oldestDate.getTime()) / (1000 * 60 * 60 * 24)))
    const averagePerDay = totalListeningTime / daysDiff

    // Find top artist
    const artistCounts: { [artist: string]: number } = {}
    tracks.forEach((track) => {
      artistCounts[track.artist] = (artistCounts[track.artist] || 0) + track.listeningTime
    })
    const topArtist = Object.entries(artistCounts).reduce((a, b) => (a[1] > b[1] ? a : b))[0] || "Unknown"

    // This week stats
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const thisWeekTracks = tracks.filter((track) => new Date(track.lastPlayed) >= oneWeekAgo)
    const thisWeekStats = {
      tracks: thisWeekTracks.reduce((sum, track) => sum + track.listenCount, 0),
      time: thisWeekTracks.reduce((sum, track) => sum + track.listeningTime, 0),
      uniqueTracks: thisWeekTracks.length,
    }

    return {
      totalTracks,
      totalListeningTime,
      averagePerDay,
      topArtist,
      thisWeek: thisWeekStats,
      totalPlays,
      averagePlayTime,
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  if (loading) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Your Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg animate-pulse">
                <div className="h-4 bg-white/10 rounded mb-2 w-1/2"></div>
                <div className="h-8 bg-white/10 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!stats) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Your Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-white/60">
            <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No listening data available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Your Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Music className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">Total Tracks</span>
            </div>
            <div className="text-2xl font-bold text-white">{stats.totalTracks}</div>
          </div>

          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Total Time</span>
            </div>
            <div className="text-2xl font-bold text-white">{formatTime(stats.totalListeningTime)}</div>
          </div>

          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">Daily Average</span>
            </div>
            <div className="text-2xl font-bold text-white">{formatTime(stats.averagePerDay)}</div>
          </div>

          <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 text-sm font-medium">Total Plays</span>
            </div>
            <div className="text-2xl font-bold text-white">{stats.totalPlays}</div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-white font-medium">This Week</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-sm">Total plays</span>
              <Badge variant="outline" className="border-white/30 text-white/80">
                {stats.thisWeek.tracks}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-sm">Listening time</span>
              <Badge variant="outline" className="border-white/30 text-white/80">
                {formatTime(stats.thisWeek.time)}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-sm">Unique tracks</span>
              <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/10">
                {stats.thisWeek.uniqueTracks}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-sm">Top artist</span>
              <Badge variant="outline" className="border-green-500/30 text-green-400 bg-green-500/10">
                {stats.topArtist}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-sm">Avg play time</span>
              <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/10">
                {formatTime(stats.averagePlayTime)}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
