"use client"

import { useState, useRef, useEffect } from "react"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Download, Share } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function BirthdayShare() {
    const [showCanvas, setShowCanvas] = useState(false)
    const [wishText, setWishText] = useState("")
    const [previewWish, setPreviewWish] = useState("")
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const characterImageRef = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
        const img = new Image()
        img.src = "/406_20250521180620.png"
        img.crossOrigin = "anonymous"
        img.onload = () => {
            characterImageRef.current = img
            setIsImageLoaded(true)
        }
        img.onerror = (err) => {
            console.error("Error loading image:", err)
            toast.error("Failed to load character image")
        }
    }, [])

    const generateBirthdayCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = 800
        canvas.height = 600

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, "#a18cd1")
        gradient.addColorStop(1, "#fbc2eb")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        const balloonColors = ["#FF5E7E", "#FFBD59", "#4CD964", "#5AC8FA", "#AF52DE"]

        for (let i = 0; i < 15; i++) {
            const x = Math.random() * canvas.width
            const y = Math.random() * (canvas.height / 3)
            const radius = 20 + Math.random() * 30

            ctx.beginPath()
            ctx.arc(x, y, radius, 0, Math.PI * 2)
            ctx.fillStyle = balloonColors[Math.floor(Math.random() * balloonColors.length)]
            ctx.fill()

            ctx.beginPath()
            ctx.moveTo(x, y + radius)
            ctx.lineTo(x, y + radius + 80 + Math.random() * 40)
            ctx.strokeStyle = "#FFFFFF"
            ctx.lineWidth = 2
            ctx.stroke()
        }

        for (let i = 0; i < 100; i++) {
            const x = Math.random() * canvas.width
            const y = Math.random() * canvas.height
            const width = 5 + Math.random() * 10
            const height = 5 + Math.random() * 10

            ctx.beginPath()
            ctx.rect(x, y, width, height)
            ctx.fillStyle = balloonColors[Math.floor(Math.random() * balloonColors.length)]
            ctx.fill()
        }

        if (characterImageRef.current) {
            const img = characterImageRef.current
            const imgWidth = 350
            const imgHeight = (img.height / img.width) * imgWidth
            const imgX = (canvas.width - imgWidth) / 2
            const imgY = canvas.height / 2 - imgHeight / 2 + 20

            const radius = 8 
            ctx.beginPath()
            ctx.moveTo(imgX + radius, imgY)
            ctx.lineTo(imgX + imgWidth - radius, imgY)
            ctx.quadraticCurveTo(imgX + imgWidth, imgY, imgX + imgWidth, imgY + radius)
            ctx.lineTo(imgX + imgWidth, imgY + imgHeight - radius)
            ctx.quadraticCurveTo(imgX + imgWidth, imgY + imgHeight, imgX + imgWidth - radius, imgY + imgHeight)
            ctx.lineTo(imgX + radius, imgY + imgHeight)
            ctx.quadraticCurveTo(imgX, imgY + imgHeight, imgX, imgY + imgHeight - radius)
            ctx.lineTo(imgX, imgY + radius)
            ctx.quadraticCurveTo(imgX, imgY, imgX + radius, imgY)
            ctx.closePath()
            ctx.save()
            ctx.clip()
            ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight)
            
            ctx.restore()
        }

        ctx.font = "bold 80px 'Comic Sans MS', cursive"
        ctx.textAlign = "center"

        ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
        ctx.fillText("Happy Birthday!!", canvas.width / 2 + 4, 90 + 4)

        ctx.fillStyle = "#FFFFFF"
        ctx.fillText("Happy Birthday!!", canvas.width / 2, 90)

        ctx.font = "bold 40px 'Comic Sans MS'"
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
        ctx.fillText("23/06 - @PPekKunGzDev", canvas.width / 2 + 2, canvas.height - 60 + 2)

        ctx.fillStyle = "#FFFFFF"
        ctx.fillText("23/06 - @PPekKunGzDev", canvas.width / 2, canvas.height - 62)

        const currentWish = previewWish || wishText
        if (currentWish && currentWish.trim()) {
            ctx.font = "30px 'kanit-medium'"

            ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
            ctx.fillText(`"${currentWish}"`, canvas.width / 2 + 2, canvas.height - 20 + 2)

            ctx.fillStyle = "#FFFFFF"
            ctx.fillText(`"${currentWish}"`, canvas.width / 2, canvas.height - 20)
        }

        ctx.font = "16px 'Comic Sans MS'"
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
        ctx.fillText(window.location.href, canvas.width / 2, canvas.height - 470)

    }

    const shareWebsite = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            toast.success("The link has been copied to your clipboard")
            setPreviewWish(wishText)
            setShowCanvas(true)
            setTimeout(() => {
                generateBirthdayCanvas()
            }, 200)
        } catch (error) {
            toast.error("Failed to copy the link to clipboard")
        }
    }

    const saveCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const link = document.createElement("a")
        link.download = "happy-birthday-PPekKunGzDev.png"

        link.href = canvas.toDataURL("image/png")

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        toast.success("Birthday image saved successfully!")
    }

    const closeCanvas = () => {
        setShowCanvas(false)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowCanvas(false)
            }
        }

        if (showCanvas) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [showCanvas])

    const updateWishInCanvas = () => {
        setPreviewWish(wishText)
        generateBirthdayCanvas()
        toast.success("Wish updated in preview!")
    }

    useEffect(() => {
        if (showCanvas && isImageLoaded) {
            setTimeout(() => {
                generateBirthdayCanvas()
            }, 100)
        }
    }, [previewWish, showCanvas, isImageLoaded, wishText])

    return (
        <div className="relative kanit-medium">
            <div className="mb-4">
                <label htmlFor="wish-input" className="block text-sm font-medium text-black dark:text-white mb-1">
                    เขียนคำอวยพรสั้นๆของคุณ:
                </label>
                <div className="flex gap-2">
                    <Input
                        id="wish-input"
                        type="text"
                        placeholder="เขียนการ์ดคำอวยพรสั้นๆได้ด้วยตัวคุณเอง..."
                        value={wishText}
                        onChange={(e) => setWishText(e.target.value)}
                        className="flex-1"
                        maxLength={50}
                    />
                    {showCanvas && (
                        <Button onClick={updateWishInCanvas} variant="outline" className="shrink-0">
                            Update
                        </Button>
                    )}
                </div>
                <span className="text-xs text-black/60 dark:text-white/60 mt-1">เหลือ <span className="dark:text-white text-black/80">{50 - wishText.length}</span> ตัวอักศรสำหรับพิมพ์ข้อความ</span>
            </div>

            <Button onClick={shareWebsite} className="text-white flex items-center mb-4 gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-fit">
                <Share className="h-4 w-4" />
                สร้างการ์ดอวยพร
            </Button>

            {showCanvas && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div
                        ref={containerRef}
                        className="bg-white p-6 rounded-lg shadow-xl max-w-[95vw] max-h-[95vh] flex flex-col items-center"
                    >
                        {/* <h2 className="text-2xl font-bold mb-4 text-purple-600">Birthday Card for @PPekKunGzDev</h2> */}
                        <div className="relative border border-gray-200 rounded-md overflow-hidden mb-4">
                            <canvas ref={canvasRef} className="max-w-full" style={{ maxHeight: "75vh" }} />
                            {!isImageLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                    <p>Loading image...</p>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-4">
                            <Button variant="outline" className="text-black/70" onClick={closeCanvas}>
                                ปิดหน้าต่าง
                            </Button>
                            <Button
                                onClick={saveCanvas}
                                className="text-white flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                                disabled={!isImageLoaded}
                            >
                                <Download className="h-4 w-4" />
                                บันทึกรูปภาพ
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}