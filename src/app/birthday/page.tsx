"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import toast, { Toaster } from "react-hot-toast"
import { Calendar, Gift, Send, Clock, PiggyBank, Instagram, Cake, Share2, Moon, Sun, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "react-confetti"
import { useWindowSize } from "@/hook/use-windows-size"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import WishList from "./_components/wish-list"
import { useTheme } from "next-themes"
import GiftBoxIntro from "./_components/gift-box-intro"
import Image from "next/image"
import BirthdayShare from "./_components/birthday-share"

export default function BirthdayWebsite() {
  const [showPopup, setShowPopup] = useState(false)
  const [name, setName] = useState("PPekkunGzDev")
  const [birthdayDate, setBirthdayDate] = useState("2025-06-23T00:00:00")
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [wish, setWish] = useState("")
  const [showConfetti, setShowConfetti] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [wishes, setWishes] = useState([
    {
      id: 1,
      name: "Dimension Studio",
      message: "Happy birthday! Wishing you all the best on your special day! 🎂",
      timestamp: new Date("2025-05-22T22:00:00+07:00").toISOString(),
    },
  ])
  const [senderName, setSenderName] = useState("")
  const { width, height } = useWindowSize()
  const { theme, setTheme } = useTheme()

  const isBirthday = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

  const timeDiff = Date.now() - Number.parseInt(localStorage.getItem("lastGiftAccess") || "0", 10)

  useEffect(() => {
    const lastAccessTime = localStorage.getItem("lastGiftAccess")

    if (lastAccessTime) {
      const lastAccess = Number.parseInt(lastAccessTime, 10)
      const currentTime = Date.now()
      const thirtyMinutesInMs = 30 * 60 * 1000

      if (timeDiff < thirtyMinutesInMs) {
        setShowContent(true)
      }
    }
  }, [])

  const handleGiftAccess = () => {
    setIsLoading(true)
    localStorage.setItem("lastGiftAccess", Date.now().toString())
    setTimeout(() => {
      setIsLoading(false)
      setShowContent(true)
    }, 2500)
  }

  useEffect(() => {
    if (!showContent) return
    const timer = setInterval(() => {
      const now = new Date()
      const birthday = new Date(birthdayDate)
      const diff = birthday.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setShowConfetti(true)
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [birthdayDate, showContent])

  const sendWish = async () => {
    if (!wish.trim()) {
      toast.error("กรุณาใส่คำอวยพรของคุณ!")
      return
    }

    if (!senderName.trim()) {
      toast.error("กรุณาใส่ชื่อของคุณ!")
      return
    }

    const res = await fetch("/api/wishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: senderName,
        message: wish,
      }),
    })

    const newWish = await res.json()
    setWishes([newWish, ...wishes])
    setWish("")
    setSenderName("")
    toast.success("ส่งคำอวยพรเรียบร้อยแล้ว!")
    window.location.reload()
  }

  const shareWebsite = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success("คัดลอกลิงก์เรียบร้อยแล้ว")
      setShowPopup(true)
    } catch (error) {
      toast.error("ไม่สามารถคัดลอกลิงก์ได้")
    }
  }

  const closePopup = () => {
    setShowPopup(false)
  }

  useEffect(() => {
    const loadWishes = async () => {
      const res = await fetch("/api/wishes")
      const data = await res.json()
      setWishes(data)
    }
    loadWishes()
  }, [showContent])

  return (
    <>
      {showPopup && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closePopup}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white dark:bg-gray-900 p-3 sm:p-4 lg:p-6 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[95vw] sm:max-w-md mx-2 border border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">สร้างการ์ดอวยพร</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">สร้างการ์ดอวยพรสวยๆ ส่งให้เพื่อน</p>
            </div>
            <BirthdayShare />
            <div className="flex justify-center mt-4 sm:mt-6">
              <Button onClick={closePopup} variant="outline" className="px-6">
                ปิด
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="min-h-screen transition-colors duration-300 overflow-x-hidden">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            className: "font-medium",
            style: {
              background: theme === "dark" ? "#1f2937" : "#ffffff",
              color: theme === "dark" ? "#f9fafb" : "#111827",
              border: theme === "dark" ? "1px solid #374151" : "1px solid #e5e7eb",
              borderRadius: "12px",
              boxShadow:
                theme === "dark"
                  ? "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)"
                  : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: theme === "dark" ? "#1f2937" : "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: theme === "dark" ? "#1f2937" : "#ffffff",
              },
            },
          }}
        />

        {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />}

        <AnimatePresence mode="wait">
          {!showContent ? (
            <GiftBoxIntro key="gift-box" onGiftAccess={handleGiftAccess} isLoading={isLoading} />
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="container mx-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-4 lg:py-8 max-w-7xl"
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-4 sm:mb-6 lg:mb-8"
              >
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                  <Cake className="w-3 h-3 sm:w-4 sm:h-4" />
                  Birthday Celebration
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  🎉 Happy Birthday!
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
                  ฉลองวันพิเศษของ <span className="font-semibold text-blue-600 dark:text-blue-400">{name}</span> ไปด้วยกัน
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6">
                {/* Profile Card */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="lg:col-span-4"
                >
                  <Card className="border-0 shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm overflow-hidden">
                    <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 p-4 sm:p-6 lg:p-8 text-white">
                      <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                        <h2 className="text-lg sm:text-xl font-bold">Profile</h2>
                      </div>
                      <div className="text-center">
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4">
                          <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-white/20">
                            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                            <AvatarFallback className="text-xl sm:text-2xl bg-white/10 text-white">
                              <Image src="/avatar.png" draggable="false" alt="" fill className="rounded-full" />
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{name}</h3>
                        <p className="text-sm sm:text-base text-white/80">@ppekkungzchannel</p>
                      </div>
                    </div>

                    <CardContent className="p-3 sm:p-4 lg:p-6 space-y-2 sm:space-y-3 lg:space-y-4">
                      <Link
                        href="https://ezdn.app/ppekkungz"
                        className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <PiggyBank className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">Support Me</p>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">สนับสนุน/ของขวัญ</p>
                        </div>
                      </Link>

                      <Link
                        href="https://www.instagram.com/withonlypxkky._/"
                        className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 dark:text-pink-400" />
                        </div>
                        <div>
                          <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">Follow Me</p>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">ติดตามใน Instagram</p>
                        </div>
                      </Link>

                      <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
                        <Button
                          onClick={shareWebsite}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base"
                        >
                          <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          แชร์
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                          className="border-gray-300 dark:border-gray-600 px-3 sm:px-4"
                        >
                          {theme === "dark" ? (
                            <Sun className="w-3 h-3 sm:w-4 sm:h-4" />
                          ) : (
                            <Moon className="w-3 h-3 sm:w-4 sm:h-4" />
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Countdown Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="lg:col-span-8"
                >
                  <Card className="border-0 shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm h-full">
                    <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 sm:p-6">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                        <div>
                          <CardTitle className="text-lg sm:text-xl">นับถอยหลังสู่วันเกิด</CardTitle>
                          <CardDescription className="text-indigo-100 text-sm sm:text-base">
                            เวลาที่เหลืออยู่จนถึงวันพิเศษ
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 lg:p-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                        {[
                          { label: "วัน", value: timeLeft.days, color: "from-blue-500 to-blue-600" },
                          { label: "ชั่วโมง", value: timeLeft.hours, color: "from-indigo-500 to-indigo-600" },
                          { label: "นาที", value: timeLeft.minutes, color: "from-purple-500 to-purple-600" },
                          { label: "วินาที", value: timeLeft.seconds, color: "from-pink-500 to-pink-600" },
                        ].map((item, index) => (
                          <motion.div key={item.label} whileHover={{ scale: 1.05 }} className="text-center">
                            <div
                              className={`bg-gradient-to-br ${item.color} p-3 sm:p-4 lg:p-6 rounded-2xl sm:rounded-3xl text-white shadow-lg mb-2 sm:mb-3`}
                            >
                              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">{item.value}</div>
                              <div className="text-xs sm:text-sm opacity-90">{item.label}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {isBirthday && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                          className="mt-6 sm:mt-8 text-center"
                        >
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl text-white">
                            <motion.div
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                              className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4"
                            >
                              🎂
                            </motion.div>
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">วันเกิดมาถึงแล้ว!</h3>
                            <p className="text-base sm:text-lg lg:text-xl opacity-90">ขอให้มีความสุขมากๆ นะ!</p>
                          </div>
                        </motion.div>
                      )}

                      {!isBirthday && (
                        <div className="mt-6 sm:mt-8 text-center">
                          <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 sm:px-6 py-2 sm:py-3 rounded-full">
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                            <span className="text-sm sm:text-base font-medium text-gray-900">
                              {new Date(birthdayDate).toLocaleDateString("th-TH", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Wishes Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="lg:col-span-12"
                >
                  <Card className="border-0 shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-rose-500 to-pink-600 text-white p-4 sm:p-6">
                      <div className="flex items-center gap-3">
                        <Gift className="w-5 h-5 sm:w-6 sm:h-6" />
                        <div>
                          <CardTitle className="text-lg sm:text-xl">คำอวยพร</CardTitle>
                          <CardDescription className="text-rose-100 text-sm sm:text-base">
                            ส่งคำอวยพรและดูข้อความจากเพื่อนๆ
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Tabs defaultValue="send" className="w-full">
                        <TabsList className="w-full rounded-none grid grid-cols-2 bg-gray-100 dark:bg-gray-800 h-12 sm:h-14">
                          <TabsTrigger value="send" className="text-sm sm:text-base dark:text-gray-900 font-medium">
                            ส่งคำอวยพร
                          </TabsTrigger>
                          {/* <TabsTrigger value="view" className="text-sm sm:text-base font-medium">
                            ดูคำอวยพร ({wishes.length})
                          </TabsTrigger> */}
                        </TabsList>
                        <TabsContent value="send" className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <div className="space-y-2 sm:space-y-3">
                              <Label
                                htmlFor="sender-name"
                                className="text-sm sm:text-base font-medium text-gray-900 dark:text-white"
                              >
                                ชื่อของคุณ
                              </Label>
                              <Input
                                id="sender-name"
                                placeholder="ใส่ชื่อของคุณ..."
                                value={senderName}
                                onChange={(e) => setSenderName(e.target.value)}
                                className="h-10 sm:h-12 rounded-2xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
                              />
                            </div>
                            <div className="space-y-2 sm:space-y-3">
                              <Label className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                                ประเภทคำอวยพร
                              </Label>
                              <div className="flex flex-wrap gap-1 sm:gap-2">
                                {["🎉 ขอให้มีความสุข", "🎂 สุขสันต์วันเกิด", "✨ ขอให้โชคดี"].map((template) => (
                                  <Button
                                    key={template}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setWish(template)}
                                    className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 h-auto"
                                  >
                                    {template}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2 sm:space-y-3">
                            <Label
                              htmlFor="wish"
                              className="text-sm sm:text-base font-medium text-gray-900 dark:text-white"
                            >
                              คำอวยพรของคุณ
                            </Label>
                            <Textarea
                              id="wish"
                              placeholder="เขียนคำอวยพรที่อบอุ่นและสวยงาม..."
                              value={wish}
                              onChange={(e) => setWish(e.target.value)}
                              className="min-h-24 sm:min-h-32 rounded-2xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 resize-none text-sm sm:text-base"
                            />
                          </div>
                          <Button
                            onClick={sendWish}
                            className="w-full h-10 sm:h-12 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-medium rounded-2xl text-sm sm:text-base"
                          >
                            <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                            ส่งคำอวยพร
                          </Button>
                        </TabsContent>
                        {/* <TabsContent value="view" className="p-0">
                          <WishList wishes={wishes} />
                        </TabsContent> */}
                      </Tabs>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
