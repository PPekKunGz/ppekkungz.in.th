"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Heart, MessageCircle } from "lucide-react"
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
    return date.toLocaleDateString("th-TH", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <ScrollArea className="h-[300px] sm:h-[400px] lg:h-[500px] w-full">
      <div className="p-2 sm:p-3 lg:p-4 space-y-2 sm:space-y-3">
        {wishes.length === 0 ? (
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">ยังไม่มีคำอวยพร</h3>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 px-4">เป็นคนแรกที่ส่งคำอวยพรให้เพื่อนเรา!</p>
          </div>
        ) : (
          <AnimatePresence>
            {wishes.map((wish, index) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="border border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-gray-200 dark:border-gray-700 flex-shrink-0">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold text-sm sm:text-base">
                          <Image src="/avatar.png" draggable="false" alt="" fill className="rounded-full" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                          <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate pr-2">
                            {wish.name}
                          </h4>
                          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            {formatTimestamp(wish.timestamp)}
                          </span>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4">
                          <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                            {wish.message}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleLike(wish.id)}
                            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-200 text-sm sm:text-base ${
                              likedWishes.includes(wish.id)
                                ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                            }`}
                          >
                            <Heart
                              size={14}
                              className={`sm:w-4 sm:h-4 transition-all duration-200 ${
                                likedWishes.includes(wish.id) ? "fill-current" : ""
                              }`}
                            />
                            <span className="text-xs sm:text-sm font-medium">
                              {likedWishes.includes(wish.id) ? "ถูกใจแล้ว" : "ถูกใจ"}
                            </span>
                          </motion.button>
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
