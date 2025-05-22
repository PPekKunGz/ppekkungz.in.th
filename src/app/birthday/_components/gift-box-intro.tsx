"use client"

import type React from "react"

import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion"
import { Gift, Lock } from 'lucide-react'
import { useEffect, useState } from "react"

interface GiftBoxIntroProps {
    onGiftAccess: () => void
    isLoading: boolean
}

const GiftBoxIntro: React.FC<GiftBoxIntroProps> = ({ onGiftAccess, isLoading }) => {
    const [isDragging, setIsDragging] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center p-4"
        >
            {isLoading ? (
                <LoadingAnimation />
            ) : (
                <SlideToAccess onSlideComplete={onGiftAccess} setIsDragging={setIsDragging} />
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`mt-8 text-center ${isDragging ? "pointer-events-none" : ""}`}
            >
                <div className="relative w-40 h-40 mx-auto">
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                        }}
                        className="relative z-10"
                    >
                        <motion.div
                            className="w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 rounded-xl flex items-center justify-center shadow-lg"
                            initial={{ rotateY: 0 }}
                            // whileHover={{ rotateY: 15, rotateX: -15 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <Gift size={80} className="text-white" />
                        </motion.div>
                        <motion.div
                            className="absolute -bottom-2 -right-2 w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 rounded-xl -z-10 opacity-50"
                            initial={{ rotateY: 0 }}
                            whileHover={{ rotateY: 5, rotateX: -5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        />
                    </motion.div>
                    <motion.div
                        className="absolute -inset-4 bg-purple-500/20 dark:bg-purple-500/30 rounded-full blur-xl -z-20 opacity-0"
                        whileHover={{ opacity: 0.7 }}
                    />
                </div>
            </motion.div>
        </motion.div>
    )
}

const SlideToAccess: React.FC<{
    onSlideComplete: () => void
    setIsDragging: (isDragging: boolean) => void
}> = ({ onSlideComplete, setIsDragging }) => {
    const x = useMotionValue(0)
    const controls = useAnimation()
    const [slideComplete, setSlideComplete] = useState(false)

    // Track width for responsive behavior
    const [trackWidth, setTrackWidth] = useState(280)
    const buttonSize = 64
    const maxX = trackWidth - buttonSize

    // Update track width on window resize
    useEffect(() => {
        const updateWidth = () => {
            // Limit max width to 280px on mobile, 320px on larger screens
            const newWidth = window.innerWidth < 640 ? 280 : 320
            setTrackWidth(newWidth)
        }

        updateWidth()
        window.addEventListener("resize", updateWidth)
        return () => window.removeEventListener("resize", updateWidth)
    }, [])

    // Transform x position to background width
    const backgroundWidth = useTransform(x, [0, maxX], [0, trackWidth])

    // Transform x position to opacity for the hint text
    const textOpacity = useTransform(x, [0, maxX * 0.5], [1, 0])

    const handleDragStart = () => {
        setIsDragging(true)
    }

    const handleDragEnd = () => {
        setIsDragging(false)

        if (x.get() >= maxX * 0.9) {
            // Successful slide
            controls.start({
                x: maxX,
                transition: { duration: 0.2 },
            })
            setSlideComplete(true)

            // Trigger the complete action after animation
            setTimeout(() => {
                onSlideComplete()
            }, 500)
        } else {
            // Incomplete slide, return to start
            controls.start({
                x: 0,
                transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 40,
                },
            })
        }
    }

    return (
        <div className="relative">
            <div
                className="relative h-16 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden"
                style={{ width: `${trackWidth}px` }}
            >
                {/* Filled background that grows as slider moves */}
                <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    style={{ width: backgroundWidth }}
                />

                {/* Hint text */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center text-gray-600 dark:text-gray-300 font-medium pointer-events-none"
                    style={{ opacity: textOpacity }}
                >
                    Slide to access gift
                </motion.div>

                {/* Draggable button */}
                <motion.div
                    className="absolute top-1 left-1 w-14 h-14 bg-white dark:bg-gray-900 rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ left: 0, right: maxX }}
                    dragElastic={0}
                    dragMomentum={false}
                    style={{ x }}
                    animate={controls}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    whileTap={{ scale: 1.05 }}
                >
                    {slideComplete ? (
                        <Gift className="text-pink-500" size={24} />
                    ) : (
                        <Lock className="text-purple-500" size={24} />
                    )}
                </motion.div>
            </div>
        </div>
    )
}

const LoadingAnimation = () => {
    return (
        <div className="text-center">
            <motion.div className="flex space-x-3 justify-center items-center mb-8">
                {[0, 1, 2, 3, 4].map((index) => (
                    <motion.div
                        key={index}
                        className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                        animate={{
                            y: ["0%", "-100%", "0%"],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                            delay: index * 0.1,
                        }}
                    />
                ))}
            </motion.div>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full max-w-xs mx-auto"
            />
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-purple-800 dark:text-purple-300"
            >
                Preparing your birthday surprise...
            </motion.p>
        </div>
    )
}

export default GiftBoxIntro;
