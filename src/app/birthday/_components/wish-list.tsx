"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"

interface Wish {
    id: number
    name: string
    message: string
    timestamp: string
}

interface WishListProps {
    wishes: Wish[]
}

export default function WishList({ wishes }: WishListProps) {
    const [likedWishes, setLikedWishes] = useState<number[]>([])

    const toggleLike = (id: number) => {
        if (likedWishes.includes(id)) {
            const newLikedWishes = likedWishes.filter((wishId) => wishId !== id)
            setLikedWishes(newLikedWishes)
            localStorage.setItem("likedWishes", JSON.stringify(newLikedWishes))
        } else {
            const newLikedWishes = [...likedWishes, id]
            setLikedWishes(newLikedWishes)
            localStorage.setItem("likedWishes", JSON.stringify(newLikedWishes))
        }
    }

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp)
        return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <ScrollArea className="h-[400px] w-full">
            <div className="p-4 space-y-4">
                {wishes.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No wishes yet. Be the first to send one!
                    </div>
                ) : (
                    <AnimatePresence>
                        {wishes.map((wish) => (
                            <motion.div
                                key={wish.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="overflow-hidden border-purple-100 dark:border-purple-900/30 hover:border-purple-200 dark:hover:border-purple-800/50 transition-colors dark:bg-white/5 dark:backdrop-blur-md">                                    <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        <Avatar className="h-10 w-10 border border-purple-200">
                                            <AvatarFallback className="bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 dark:backdrop-blur-sm">
                                                {/* {wish.name.charAt(0)} */}
                                                <Image src="/avatar.png" draggable="false" alt="" fill />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="font-medium text-purple-900 dark:text-purple-300">{wish.name}</h4>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {formatTimestamp(wish.timestamp)}
                                                </span>
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{wish.message}</p>
                                            <div className="mt-2 flex justify-end">
                                                <button
                                                    onClick={() => toggleLike(wish.id)}
                                                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-pink-500 transition-colors"
                                                >
                                                    <Heart
                                                        size={14}
                                                        className={likedWishes.includes(wish.id) ? "fill-pink-500 text-pink-500" : ""}
                                                    />
                                                    <span>{likedWishes.includes(wish.id) ? "Liked" : "Like"}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>
        </ScrollArea>
    )
}