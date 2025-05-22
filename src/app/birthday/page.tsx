"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import toast, { Toaster } from "react-hot-toast"
import { Calendar, Gift, Send, Clock, PiggyBank, Instagram, Cake, Share2, Moon, Sun } from "lucide-react"
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
    const [name, setName] = useState("@PPekkunGzDev")
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

    useEffect(() => {
        const lastAccessTime = localStorage.getItem("lastGiftAccess")

        if (lastAccessTime) {
            const lastAccess = Number.parseInt(lastAccessTime, 10)
            const currentTime = Date.now()
            const timeDiff = currentTime - lastAccess
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
            toast.error("Please enter your wish!")
            return
        }

        if (!senderName.trim()) {
            toast.error("Please enter your name!")
            return
        }

        const newWish = {
            id: wishes.length + 1,
            name: senderName,
            message: wish,
            timestamp: new Date().toISOString(),
        }

        setWishes([newWish, ...wishes])

        const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL
        if (webhookUrl) {
            try {
                await fetch(webhookUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: "Birthday Wishes",
                        embeds: [
                            {
                                title: `อวยพรวันเกิดโดยคุณ - ${senderName}`,
                                description: wish,
                                color: 10181046,
                                timestamp: new Date().toISOString(),
                            },
                        ],
                    }),
                })
            } catch (error) {
                console.error("Error sending to webhook:", error)
            }
        }

        setWish("")
        setSenderName("")

        toast.success("Your wish has been sent successfully!")
    }

    const shareWebsite = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            toast.success("The link has been copied to your clipboard")
            setShowPopup(true)
        } catch (error) {
            toast.error("Failed to copy the link to clipboard")
        }
    }

    const closePopup = () => {
        setShowPopup(false)
    }

    return (
        <>
            {showPopup && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center" onClick={closePopup}>
                    <div className="bg-white dark:bg-slate-50/10 p-6 rounded-lg shadow-lg max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-bold mb-4 text-purple-800 dark:text-purple-300">🖼️สร้างการ์ดอวยพร</h3>
                        <span className="mb-4 text-gray-600 dark:text-gray-300">
                            <BirthdayShare />
                        </span>
                        <div className="flex justify-end">
                            <Button onClick={closePopup} className="text-white kanit-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">ปิดหน้าต่าง</Button>
                        </div>
                    </div>
                </div>
            )}
            <div className="min-h-screen p-4 sm:p-8 dark:text-white kanit-medium">
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: theme === "dark" ? "rgba(30, 30, 42, 0.7)" : "#fff",
                            color: theme === "dark" ? "#fff" : "#333",
                            border: theme === "dark" ? "1px solid rgba(45, 45, 61, 0.3)" : "1px solid #e2e8f0",
                            backdropFilter: theme === "dark" ? "blur(10px)" : "none",
                            WebkitBackdropFilter: theme === "dark" ? "blur(10px)" : "none",
                            boxShadow: theme === "dark" ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "none",
                        },
                        success: {
                            iconTheme: {
                                primary: "#10b981",
                                secondary: theme === "dark" ? "#1e1e2a" : "#fff",
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: "#ef4444",
                                secondary: theme === "dark" ? "#1e1e2a" : "#fff",
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
                            transition={{ duration: 0.5 }}
                            className="max-w-4xl mx-auto"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-center mb-8"
                            >
                                <h1 className="text-4xl font-bold text-purple-800 dark:text-purple-300 mb-2">
                                    🎉 Happy Birthday! 🎉{/* {isBirthday ? "🎉 Happy Birthday! 🎉" : "Birthday Countdown"} */}
                                </h1>
                                <p className="text-lg text-gray-600 dark:text-gray-300">ฉลองวันพิเศษของ {name}</p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <Card className="md:col-span-1 overflow-hidden border-purple-200 dark:border-purple-800/30 shadow-md dark:shadow-purple-900/20 dark:bg-white/5 dark:backdrop-blur-md">
                                        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-700/80 dark:to-pink-700/80 text-white dark:backdrop-blur-sm">
                                            <CardTitle className="flex items-center gap-2">
                                                <Calendar className="h-5 w-5" /> Profile
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex flex-col items-center pt-6">
                                            <div className="relative w-32 h-32 mb-4">
                                                <Avatar className="w-32 h-32 border-4 border-purple-300">
                                                    <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile" />
                                                    <AvatarFallback className="text-3xl bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                                                        {name.charAt(0) ? (
                                                            <Image src="/avatar.png" draggable="false" alt="" fill />
                                                        ) : (
                                                            name.charAt(0)
                                                        )}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </div>

                                            <h3 className="text-center font-medium text-lg mb-2">{name}</h3>

                                            <div className="w-full mt-4">
                                                <div className="flex flex-col space-y-2">
                                                    <Link
                                                        href={"https://ezdn.app/ppekkungz"}
                                                        className="flex gap-2 items-center p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors"
                                                    >
                                                        <PiggyBank color="#d946ef" size={24} />
                                                        <span>Support Me</span>
                                                    </Link>
                                                    <Link
                                                        href={"https://www.instagram.com/withonlypxkky._/"}
                                                        className="flex gap-2 items-center p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors"
                                                    >
                                                        <Instagram color="#d946ef" size={24} />
                                                        <span>Follow Me</span>
                                                    </Link>
                                                    <div className="flex gap-2 mt-2">
                                                        <Button
                                                            variant="outline"
                                                            className="flex-1 gap-2 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/40 dark:hover:backdrop-blur-lg hover:text-purple-800 dark:hover:text-purple-300"
                                                            onClick={shareWebsite}
                                                        >
                                                            <Share2 size={16} />
                                                            Share
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            className="border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/40 dark:hover:backdrop-blur-lg hover:text-purple-800 dark:hover:text-purple-300"
                                                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                                        >
                                                            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                {/* Countdown Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="md:col-span-2"
                                >
                                    <Card className="border-purple-200 dark:border-purple-800/30 shadow-md dark:shadow-purple-900/20 dark:bg-white/5 dark:backdrop-blur-md h-full">
                                        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-700/80 dark:to-pink-700/80 text-white dark:backdrop-blur-sm">
                                            <CardTitle className="flex items-center gap-2">
                                                <Clock className="h-5 w-5" /> นับถอยหลังสู่วันเกิด
                                            </CardTitle>
                                            <CardDescription className="text-purple-100 dark:text-purple-200">
                                            เวลาที่เหลืออยู่จนถึงวันพิเศษ
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-6">
                                            <div className="grid grid-cols-4 gap-2 text-center">
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    className="bg-purple-100 dark:bg-purple-900/40 dark:backdrop-blur-sm p-4 rounded-lg shadow-sm"
                                                >
                                                    <p className="text-3xl font-bold text-purple-800 dark:text-purple-300">{timeLeft.days}</p>
                                                    <p className="text-sm text-purple-600 dark:text-purple-400">Days</p>
                                                </motion.div>
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    className="bg-pink-100 dark:bg-pink-900/40 dark:backdrop-blur-sm p-4 rounded-lg shadow-sm"
                                                >
                                                    <p className="text-3xl font-bold text-pink-800 dark:text-pink-300">{timeLeft.hours}</p>
                                                    <p className="text-sm text-pink-600 dark:text-pink-400">Hours</p>
                                                </motion.div>
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    className="bg-blue-100 dark:bg-blue-900/40 dark:backdrop-blur-sm p-4 rounded-lg shadow-sm"
                                                >
                                                    <p className="text-3xl font-bold text-blue-800 dark:text-blue-300">{timeLeft.minutes}</p>
                                                    <p className="text-sm text-blue-600 dark:text-blue-400">Minutes</p>
                                                </motion.div>
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    className="bg-green-100 dark:bg-green-900/40 dark:backdrop-blur-sm p-4 rounded-lg shadow-sm"
                                                >
                                                    <p className="text-3xl font-bold text-green-800 dark:text-green-300">{timeLeft.seconds}</p>
                                                    <p className="text-sm text-green-600 dark:text-green-400">Seconds</p>
                                                </motion.div>
                                            </div>

                                            {isBirthday && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.5 }}
                                                    className="mt-6 text-center"
                                                >
                                                    <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-300">
                                                        🎉 It's Your Birthday! 🎉
                                                    </h3>
                                                    <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">Have an amazing day!</p>
                                                    <div className="flex justify-center mt-4">
                                                        <motion.div
                                                            animate={{
                                                                scale: [1, 1.2, 1],
                                                                rotate: [0, 5, -5, 0],
                                                            }}
                                                            transition={{
                                                                repeat: Number.POSITIVE_INFINITY,
                                                                duration: 2,
                                                            }}
                                                        >
                                                            <Cake size={64} className="text-pink-500" />
                                                        </motion.div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {!isBirthday && (
                                                <div className="mt-6 text-center">
                                                    <p className="text-purple-700 dark:text-gray-300">
                                                        {" "}
                                                        <span className="font-semibold">
                                                            {new Date(birthdayDate).toLocaleDateString("th-TH", {
                                                                weekday: "long",
                                                                year: "numeric",
                                                                month: "long",
                                                                day: "numeric",
                                                            })}
                                                        </span>
                                                    </p>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                {/* Wishes Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="md:col-span-3"
                                >
                                    <Card className="border-purple-200 dark:border-purple-800/30 shadow-md dark:shadow-purple-900/20 dark:bg-white/5 dark:backdrop-blur-md">
                                        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-700/80 dark:to-pink-700/80 text-white dark:backdrop-blur-sm">
                                            <CardTitle className="flex items-center gap-2">
                                                <Gift className="h-5 w-5" /> คำอวยพร
                                            </CardTitle>
                                            <CardDescription className="text-purple-100 dark:text-purple-200">
                                                ส่งคำอวยพรของคุณและดูว่าคนที่อื่นๆได้ส่งไปแล้ว
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            <Tabs defaultValue="send" className="w-full">
                                                <TabsList className="w-full rounded-none grid grid-cols-2 dark:bg-white/10 dark:backdrop-blur-md">
                                                    <TabsTrigger value="send">ส่งคำอวยพร</TabsTrigger>
                                                    <TabsTrigger value="view">ดูคำอวยพรทั้งหมด</TabsTrigger>
                                                </TabsList>
                                                <TabsContent value="send" className="p-6 space-y-5">
                                                    <div className="flex flex-col gap-3">
                                                        <Label htmlFor="sender-name">ชื่อของคุณ</Label>
                                                        <Input
                                                            id="sender-name"
                                                            placeholder="พิมพ์ชื่อของคุณ..."
                                                            value={senderName}
                                                            onChange={(e) => setSenderName(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-3">
                                                        <Label htmlFor="wish" className="">
                                                            ส่งคำอวยพรของคุณ
                                                        </Label>
                                                        <Textarea
                                                            id="wish"
                                                            placeholder="เขียนคำอวยพรของคุณ..."
                                                            value={wish}
                                                            onChange={(e) => setWish(e.target.value)}
                                                            className="min-h-32"
                                                        />
                                                    </div>
                                                    <Button
                                                        className="w-full gap-2 text-slate-100 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 dark:from-purple-700 dark:to-pink-700 dark:hover:from-purple-800 dark:hover:to-pink-800"
                                                        onClick={sendWish}
                                                    >
                                                        <Send className="h-4 w-4" /> ส่งคำอวยพร
                                                    </Button>
                                                </TabsContent>
                                                <TabsContent value="view" className="p-0">
                                                    <WishList wishes={wishes} />
                                                </TabsContent>
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
