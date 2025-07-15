"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Music, Pause, Play, RefreshCw, ExternalLink, Code, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface SpotifyTrack {
    title: string
    artist: string
    album: string
    url: string
    imageUrl: string
    duration: number
    isPlaying?: boolean
    progress?: number
}

interface VSCodePresence {
    project: string
    file: string
    language: string
    timeElapsed: string
}

export default function Component() {
    const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null)
    const [tracks, setTracks] = useState<SpotifyTrack[]>([])
    const [loading, setLoading] = useState(true)
    const [progress, setProgress] = useState(0)
    const [darkMode, setDarkMode] = useState(true)
    const [vsCodePresence, setVSCodePresence] = useState<VSCodePresence>({
        project: "spotify-integration",
        file: "page.tsx",
        language: "TypeScript React",
        timeElapsed: "42:28",
    })

    const FavPlaylist: any = [
        {
            image: "https://sjc.microlink.io/R58zg0zdHLE19QzbSUXBQR_ejgrROvqM-RAO9dQjS6NVmdLAchkbKjjJyWfB7ZyniDbQk7yc0NrpCPKVQB9RvA.jpeg",
            url: "https://open.spotify.com/playlist/37i9dQZF1EIYh38jvS3Is6?si=13c8d725494f4e29",
            track: "yung kai Mix",
            author: "wave to earth, d4vd and Dhruv",
            desc: "50 songs, about 2 hr 45 min"
        },
        {
            image: "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/artistmix/2zByTMDKM5g76Kbz4huf0A/en",
            url: "https://open.spotify.com/playlist/37i9dQZF1EIZItYsk1PmVI",
            track: "Only Monday Mix",
            author: "guncharlie, YEW and Mirrr",
            desc: "50 songs, about 3 hr 30 min"
        },
        {
            image: "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/artistmix/6HEMZkIMQAPnd36iLsUlTx/en",
            url: "https://open.spotify.com/playlist/37i9dQZF1EIUpYsUGgsIua",
            track: "PUN Mix",
            author: "Billkin, guncharlie and Three Man Down",
            desc: "50 songs, about 3 hr 15 min"
        }
    ]

    const playlistTracks: SpotifyTrack[] = [
        {
            title: "blue",
            artist: "yung kai",
            album: "blue",
            url: "https://open.spotify.com/track/5QO79kh1waicV47BqGRL3g",
            imageUrl: "https://i.scdn.co/image/ab67616d00001e02e2e352d89826aef6dbd5ff8f",
            duration: 214000, // 3:34
        },
        {
            title: "bad",
            artist: "wave to earth",
            album: "0.1 flaws and all",
            url: "https://open.spotify.com/track/6H67gFuycHyTOROX2M4bbs",
            imageUrl: "https://i.scdn.co/image/ab67616d00001e0224f8c3ad20b7c6cfecb5832e",
            duration: 263000, // 4:23
        },
        {
            title: "do you think you could love me?",
            artist: "yung kai",
            album: "do you think you could love me?",
            url: "https://open.spotify.com/track/5Jg9s9BgzSdBFzxZeEZHBE",
            imageUrl: "https://i.scdn.co/image/ab67616d00001e02c9f744b0d62da795bc21d04a",
            duration: 216000, // 3:36
        },
        {
            title: "Here With Me",
            artist: "d4vd",
            album: "Here With Me",
            url: "https://open.spotify.com/track/5LrN7yUQAzvthd4QujgPFr",
            imageUrl: "https://i.scdn.co/image/ab67616d00001e0264fa1bda999f4fbd2b7c4bb7",
            duration: 242000, // 4:02
        },
        {
            title: "wildflower",
            artist: "yung kai",
            album: "wildflower",
            url: "https://open.spotify.com/track/5Jg9s9BgzSdBFzxZeEZHBE",
            imageUrl: "https://i.scdn.co/image/ab67616d00001e02e2e352d89826aef6dbd5ff8f",
            duration: 175000, // 2:55
        },
        {
            title: "Die With A Smile",
            artist: "Lady Gaga, Bruno Mars",
            album: "MAYHEM",
            url: "https://open.spotify.com/track/2plbrEY59IikOBgBGLjaoe",
            imageUrl: "https://i.scdn.co/image/ab67616d00001e0282ea2e9e1858aa012c57cd45",
            duration: 251000, // 4:11
        },
        {
            title: "listen to this when you're down <3",
            artist: "yung kai",
            album: "listen to this when you're down <3",
            url: "https://open.spotify.com/track/5Jg9s9BgzSdBFzxZeEZHBE",
            imageUrl: "https://i.scdn.co/image/ab67616d00001e02e2e352d89826aef6dbd5ff8f",
            duration: 113000, // 1:53
        },
        {
            title: "seasons",
            artist: "wave to earth",
            album: "summer flows 0.02",
            url: "https://open.spotify.com/track/5VBjyOQzqlPNgdRPMM6prF",
            imageUrl: "https://i.scdn.co/image/ab67616d00001e023f203b8d0d8e54fab416a825",
            duration: 255000, // 4:15
        },
    ]

    const loadData = () => {
        setLoading(true)
        // Simulate loading delay
        setTimeout(() => {
            // Set a random track as current
            const randomIndex = Math.floor(Math.random() * playlistTracks.length)
            const selected = {
                ...playlistTracks[randomIndex],
                isPlaying: true,
                progress: Math.floor(Math.random() * playlistTracks[randomIndex].duration),
            }

            setCurrentTrack(selected)
            setTracks(playlistTracks)
            setProgress(selected.progress || 0)
            setLoading(false)
        }, 1000)
    }

    useEffect(() => {
        loadData()

        // Update VS Code presence time elapsed
        const interval = setInterval(() => {
            const [minutes, seconds] = vsCodePresence.timeElapsed.split(":").map(Number)

            let newSeconds = seconds + 1
            let newMinutes = minutes

            if (newSeconds >= 60) {
                newSeconds = 0
                newMinutes++
            }

            setVSCodePresence((prev) => ({
                ...prev,
                timeElapsed: `${newMinutes}:${newSeconds.toString().padStart(2, "0")}`,
            }))
        }, 1000) // Update every second for demo purposes

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (!currentTrack?.isPlaying) return

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= (currentTrack.duration || 0)) {
                    // Move to next track when current one finishes
                    const currentIndex = tracks.findIndex((t) => t.title === currentTrack.title)
                    const nextIndex = (currentIndex + 1) % tracks.length
                    const nextTrack = { ...tracks[nextIndex], isPlaying: true, progress: 0 }
                    setCurrentTrack(nextTrack)
                    return 0
                }
                return prev + 1000
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [currentTrack?.isPlaying, currentTrack?.duration, currentTrack?.title, tracks])

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000)
        const seconds = Math.floor((ms % 60000) / 1000)
        return `${minutes}:${seconds.toString().padStart(2, "0")}`
    }

    const openSpotifyUrl = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer")
    }

    const togglePlayPause = () => {
        if (currentTrack) {
            setCurrentTrack({
                ...currentTrack,
                isPlaying: !currentTrack.isPlaying,
            })
        }
    }

    const playTrack = (track: SpotifyTrack) => {
        setCurrentTrack({
            ...track,
            isPlaying: true,
            progress: 0,
        })
        setProgress(0)
    }

    const progressPercentage = currentTrack ? (progress / currentTrack.duration) * 100 : 0

    return (
        <div
            className={cn(
                "min-h-screen transition-colors duration-300 p-4 md:p-8"
            )}
        >
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Music className="h-6 w-6" />
                        <span>yung kai Mix</span>
                    </h1>
                    <div className="flex items-center gap-3">
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        {/* Current Track Card */}
                        <Card
                            className={cn(
                                "backdrop-blur-lg border transition-all duration-300",
                                darkMode
                                    ? "bg-gray-900/60 border-gray-700 text-white shadow-lg shadow-purple-500/10"
                                    : "bg-white/80 border-gray-200 text-gray-900 shadow-lg shadow-purple-500/5",
                            )}
                        >
                            <CardContent className="p-6">
                                {loading ? (
                                    <div className="flex items-center justify-center py-8">
                                        <RefreshCw className="w-8 h-8 animate-spin" />
                                    </div>
                                ) : currentTrack ? (
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="relative w-full md:w-48 h-48 flex-shrink-0">
                                            <img
                                                src={currentTrack.imageUrl || "/placeholder.svg"}
                                                alt={currentTrack.title}
                                                className="w-full h-full object-cover rounded-lg shadow-lg"
                                            />
                                            <div
                                                className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                                                onClick={togglePlayPause}
                                            >
                                                {currentTrack.isPlaying ? (
                                                    <Pause className="w-12 h-12 text-white" />
                                                ) : (
                                                    <Play className="w-12 h-12 text-white" />
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <Badge
                                                    className={cn(
                                                        "mb-2",
                                                        darkMode ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-800",
                                                    )}
                                                >
                                                    {currentTrack.isPlaying ? "NOW PLAYING" : "PAUSED"}
                                                </Badge>
                                                <h2
                                                    className="text-2xl font-bold mb-1 hover:text-purple-500 transition-colors cursor-pointer"
                                                    onClick={() => openSpotifyUrl(currentTrack.url)}
                                                >
                                                    {currentTrack.title}
                                                </h2>
                                                <p className="text-lg opacity-80 mb-1">{currentTrack.artist}</p>
                                                <p className="text-sm opacity-60">{currentTrack.album}</p>
                                            </div>

                                            <div className="mt-4">
                                                <Progress
                                                    value={progressPercentage}
                                                    className={cn(
                                                        "h-1.5",
                                                        darkMode ? "bg-gray-700 [&>div]:bg-purple-500" : "bg-gray-200 [&>div]:bg-purple-500",
                                                    )}
                                                />
                                                <div className="flex justify-between text-sm mt-1 opacity-70">
                                                    <span>{formatTime(progress)}</span>
                                                    <span>{formatTime(currentTrack.duration)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">No track selected</div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Playlist Tracks */}
                        <Card
                            className={cn(
                                "backdrop-blur-lg border transition-all duration-300",
                                darkMode
                                    ? "bg-gray-900/60 border-gray-700 text-white shadow-lg shadow-purple-500/10"
                                    : "bg-white/80 border-gray-200 text-gray-900 shadow-lg shadow-purple-500/5",
                            )}
                        >
                            <CardContent className="p-6">
                                <h2 className="text-lg font-semibold mb-4">Playlist Tracks</h2>
                                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                                    {tracks.map((track, index) => (
                                        <div
                                            key={index}
                                            className={cn(
                                                "flex items-center gap-3 p-2 rounded-lg transition-colors cursor-pointer",
                                                currentTrack?.title === track.title
                                                    ? darkMode
                                                        ? "bg-purple-900/30"
                                                        : "bg-purple-100/50"
                                                    : darkMode
                                                        ? "hover:bg-gray-800/50"
                                                        : "hover:bg-gray-100/50",
                                            )}
                                            onClick={() => playTrack(track)}
                                        >
                                            <div className="relative w-12 h-12 flex-shrink-0">
                                                <img
                                                    src={track.imageUrl || "/placeholder.svg"}
                                                    alt={track.title}
                                                    className="w-full h-full object-cover rounded"
                                                />
                                                {currentTrack?.title === track.title && currentTrack?.isPlaying && (
                                                    <div className="absolute inset-0 bg-black/30 rounded flex items-center justify-center">
                                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium truncate">{track.title}</div>
                                                <div className="text-sm opacity-70 truncate">{track.artist}</div>
                                            </div>
                                            <div className="text-sm opacity-60">{formatTime(track.duration)}</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* VS Code Rich Presence - Discord Style */}
                    <Card
                        className={cn(
                            "backdrop-blur-lg border transition-all duration-300 overflow-hidden h-fit",
                            darkMode
                                ? "bg-gradient-to-br from-pink-500/20 to-purple-600/20 border-pink-500/30 dark:text-white shadow-lg shadow-pink-500/10"
                                : "bg-gradient-to-br from-pink-200/60 to-purple-300/60 border-pink-300/50 text-gray-900 shadow-lg shadow-pink-500/5",
                        )}
                    >
                        <CardContent className="p-0">
                            <div className="">
                                <div
                                    className={cn(
                                        "px-4 py-2 text-xs font-medium flex justify-between items-center",
                                        darkMode ? "bg-black/20" : "bg-white/30",
                                    )}
                                >
                                    <span>Playing</span>
                                    <button className="opacity-60 hover:opacity-100">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                            <circle cx="3" cy="8" r="1" />
                                            <circle cx="8" cy="8" r="1" />
                                            <circle cx="13" cy="8" r="1" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="p-4 ">
                                    <div className="flex items-start gap-3">
                                        <div className="relative flex-shrink-0">
                                            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                                                <Code className="w-7 h-7 text-white" />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-800 rounded-full border-2 border-current flex items-center justify-center">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-2">
                                            <h3 className="font-semibold text-base mb-1">Visual Studio Code</h3>
                                            <p className="text-sm opacity-80 mb-2">กำลังทำงานอยู่</p>
                                            <p className="text-sm opacity-90 mb-3">Working on {vsCodePresence.file}:254:1</p>

                                            <div className="flex items-center gap-2 text-xs opacity-70">
                                                <div className="flex items-center gap-1">
                                                    <div className="w-3 h-3 rounded-sm bg-current opacity-60"></div>
                                                    <span>{vsCodePresence.timeElapsed}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="bg-gradient-to-br from-pink-500/20 to-purple-600/20 border-pink-500/30 dark:text-white shadow-lg shadow-pink-500/10"/>

                            <div className="flex flex-col gap-4 p-4">
                                {FavPlaylist.map((playlist: any, index: number) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <img
                                            src={playlist.image}
                                            alt={playlist.track}
                                            className="w-16 h-16 rounded object-cover cursor-pointer"
                                            onClick={() => {
                                                const modal = document.createElement('div');
                                                modal.className = 'fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50';
                                                modal.innerHTML = `
                                                    <div class="bg-gray-800/20 dark:bg-gray-800/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-md w-fit mx-4 border border-white/20">
                                                        <div class="flex flex-col text-center items-center gap-4 mb-6">
                                                            <img src="${playlist.image}" alt="${playlist.track}" class="w-35 h-35 rounded-lg object-cover shadow-lg"/>
                                                            <div>
                                                                <h3 class="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">${playlist.track}</h3>
                                                                <p class="text-sm text-white opacity-80">${playlist.author}</p>
                                                            </div>
                                                        </div>
                                                        <div class="flex justify-end gap-3">
                                                            <a href="${playlist.url}" class="px-4 py-2 text-sm bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all">Play Now</a>
                                                            <button class="px-4 py-2 text-sm bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all" onclick="this.closest('.fixed').remove()">Cancel</button>
                                                        </div>
                                                    </div>
                                                `;
                                                document.body.appendChild(modal);
                                            }}
                                        />
                                        <div>
                                            <h2 className="font-semibold">{playlist.track}</h2>
                                            <p className="text-sm opacity-70">{playlist.author}</p>
                                            <p className="text-xs opacity-60">{playlist.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
