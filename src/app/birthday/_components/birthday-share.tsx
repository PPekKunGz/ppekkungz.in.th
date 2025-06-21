"use client"

import { useState, useRef, useEffect } from "react"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Download, Palette } from "lucide-react"
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
      toast.error("ไม่สามารถโหลดรูปภาพได้")
    }
  }, [])

  const generateBirthdayCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 800
    canvas.height = 600

    // Modern gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#667eea")
    gradient.addColorStop(0.5, "#764ba2")
    gradient.addColorStop(1, "#f093fb")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add geometric shapes
    const shapes = [
      { x: 100, y: 100, size: 60, color: "rgba(255, 255, 255, 0.1)" },
      { x: 700, y: 150, size: 80, color: "rgba(255, 255, 255, 0.08)" },
      { x: 150, y: 500, size: 40, color: "rgba(255, 255, 255, 0.12)" },
      { x: 650, y: 450, size: 50, color: "rgba(255, 255, 255, 0.1)" },
    ]

    shapes.forEach((shape) => {
      ctx.beginPath()
      ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2)
      ctx.fillStyle = shape.color
      ctx.fill()
    })

    // Character image with modern styling
    if (characterImageRef.current) {
      const img = characterImageRef.current
      const imgWidth = 300
      const imgHeight = (img.height / img.width) * imgWidth
      const imgX = (canvas.width - imgWidth) / 2
      const imgY = canvas.height / 2 - imgHeight / 2 + 30

      // Add shadow
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)"
      ctx.shadowBlur = 20
      ctx.shadowOffsetY = 10

      const radius = 20
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

      // Reset shadow
      ctx.shadowColor = "transparent"
      ctx.shadowBlur = 0
      ctx.shadowOffsetY = 0
    }

    // Modern typography
    ctx.textAlign = "center"

    // Main title with shadow
    ctx.font = "bold 64px 'Inter', sans-serif"
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
    ctx.fillText("Happy Birthday!", canvas.width / 2 + 3, 100 + 3)

    ctx.fillStyle = "#ffffff"
    ctx.fillText("Happy Birthday!", canvas.width / 2, 100)

    // Subtitle
    ctx.font = "600 32px 'Inter', sans-serif"
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
    ctx.fillText("23/06 - @PPekKunGzDev", canvas.width / 2 + 2, canvas.height - 80 + 2)

    ctx.fillStyle = "#ffffff"
    ctx.fillText("23/06 - @PPekKunGzDev", canvas.width / 2, canvas.height - 80)

    // Custom wish text
    const currentWish = previewWish || wishText
    if (currentWish && currentWish.trim()) {
      ctx.font = "400 24px 'Inter', sans-serif"

      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
      ctx.fillText(`"${currentWish}"`, canvas.width / 2 + 2, canvas.height - 40 + 2)

      ctx.fillStyle = "#ffffff"
      ctx.fillText(`"${currentWish}"`, canvas.width / 2, canvas.height - 40)
    }

    // Website URL
    ctx.font = "400 14px 'Inter', sans-serif"
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
    ctx.fillText(window.location.href, canvas.width / 2, 50)
  }

  const shareWebsite = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success("คัดลอกลิงก์เรียบร้อยแล้ว")
      setPreviewWish(wishText)
      setShowCanvas(true)
      setTimeout(() => {
        generateBirthdayCanvas()
      }, 200)
    } catch (error) {
      toast.error("ไม่สามารถคัดลอกลิงก์ได้")
    }
  }

  const saveCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement("a")
    link.download = "happy-birthday-card.png"
    link.href = canvas.toDataURL("image/png")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast.success("บันทึกการ์ดเรียบร้อยแล้ว!")
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
    toast.success("อัปเดตคำอวยพรแล้ว!")
  }

  useEffect(() => {
    if (showCanvas && isImageLoaded) {
      setTimeout(() => {
        generateBirthdayCanvas()
      }, 100)
    }
  }, [previewWish, showCanvas, isImageLoaded, wishText])

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="space-y-2 sm:space-y-3">
        <label htmlFor="wish-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          คำอวยพรของคุณ
        </label>
        <div className="flex gap-2 sm:gap-3">
          <Input
            id="wish-input"
            type="text"
            placeholder="เขียนคำอวยพรสั้นๆ..."
            value={wishText}
            onChange={(e) => setWishText(e.target.value)}
            className="flex-1 rounded-xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm sm:text-base"
            maxLength={50}
          />
          {showCanvas && (
            <Button onClick={updateWishInCanvas} variant="outline" className="shrink-0 rounded-xl px-3 sm:px-4 text-sm">
              อัปเดต
            </Button>
          )}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          เหลือ <span className="font-medium text-gray-700 dark:text-gray-300">{50 - wishText.length}</span> ตัวอักษร
        </p>
      </div>

      <Button
        onClick={shareWebsite}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl text-sm sm:text-base"
      >
        <Palette className="w-4 h-4 mr-2" />
        สร้างการ์ดอวยพร
      </Button>

      {showCanvas && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div
            ref={containerRef}
            className="bg-white dark:bg-gray-900 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl w-full max-w-[98vw] sm:max-w-[95vw] max-h-[95vh] flex flex-col items-center overflow-hidden"
          >
            <div className="relative border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4 lg:mb-6 shadow-xl w-full">
              <canvas
                ref={canvasRef}
                className="w-full h-auto max-h-[60vh] sm:max-h-[70vh]"
                style={{ display: "block" }}
              />
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">กำลังโหลด...</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-3 sm:gap-4">
              <Button variant="outline" className="px-4 sm:px-6 rounded-xl text-sm sm:text-base" onClick={closeCanvas}>
                ปิด
              </Button>
              <Button
                onClick={saveCanvas}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 sm:px-6 rounded-xl text-sm sm:text-base"
                disabled={!isImageLoaded}
              >
                <Download className="w-4 h-4 mr-2" />
                บันทึกรูป
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
