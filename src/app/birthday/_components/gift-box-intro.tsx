"use client"

import type React from "react"
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion"
import { Gift, Lock, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

interface GiftBoxIntroProps {
  onGiftAccess: () => void
  isLoading: boolean
}

const GiftBoxIntro: React.FC<GiftBoxIntroProps> = ({ onGiftAccess, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-2 sm:p-4 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center w-full max-w-md mx-auto"
      >
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <>
            <div className="flex justify-center w-full mb-8 sm:mb-12">
              <SlideToAccess onSlideComplete={onGiftAccess} setIsDragging={setIsDragging} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`mt-12 sm:mt-16 ${isDragging ? "pointer-events-none" : ""}`}
            >
              {/* <div className="flex justify-center items-center w-full">
                <div className="relative w-32 h-32 sm:w-40 md:w-48 lg:w-56 sm:h-40 md:h-48 lg:h-56">
                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                    className="relative z-10"
                  >
                    <motion.div
                      className="w-40 h-40 sm:w-48 md:w-56 sm:h-48 md:h-56 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 dark:from-blue-600 dark:via-indigo-700 dark:to-purple-700 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl"
                      whileHover={{
                        scale: 1.05,
                        rotateY: 15,
                        rotateX: -10,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Gift size={80} className="sm:w-24 sm:h-24 md:w-32 md:h-32 text-white drop-shadow-2xl" />
                    </motion.div>

                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${10 + (i % 2) * 80}%`,
                        }}
                        animate={{
                          y: [0, -30, 0],
                          opacity: [0.4, 1, 0.4],
                          scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.5,
                        }}
                      >
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-400" />
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    className="absolute -inset-8 sm:-inset-12 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-full blur-2xl sm:blur-3xl -z-10"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                </div>
              </div> */}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 sm:mt-8 px-4 text-center w-full"
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  🎉 Birthday Surprise
                </h1>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  เลื่อนเพื่อเปิดของขวัญวันเกิดพิเศษ
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  )
}

const SlideToAccess: React.FC<{
  onSlideComplete: () => void
  setIsDragging: (isDragging: boolean) => void
}> = ({ onSlideComplete, setIsDragging }) => {
  const x = useMotionValue(0)
  const controls = useAnimation()
  const [slideComplete, setSlideComplete] = useState(false)

  const [trackWidth, setTrackWidth] = useState(320)
  const buttonSize = 64
  const maxX = trackWidth - buttonSize

  useEffect(() => {
    const updateWidth = () => {
      const newWidth = window.innerWidth < 640 ? 260 : window.innerWidth < 768 ? 300 : 360
      setTrackWidth(newWidth)
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  const backgroundWidth = useTransform(x, [0, maxX], [0, trackWidth])
  const textOpacity = useTransform(x, [0, maxX * 0.6], [1, 0])

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    setIsDragging(false)

    if (x.get() >= maxX * 0.8) {
      controls.start({
        x: maxX,
        transition: { duration: 0.4, ease: "easeOut" },
      })
      setSlideComplete(true)

      setTimeout(() => {
        onSlideComplete()
      }, 800)
    } else {
      controls.start({
        x: 0,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 25,
        },
      })
    }
  }

  return (
    <div className="flex justify-center">
      <div
        className="relative h-16 sm:h-20 md:h-24 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-md overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700"
        style={{ width: `${trackWidth}px` }}
      >
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl"
          style={{ width: backgroundWidth }}
        />

        <motion.div
          className="absolute inset-0 flex items-center justify-center text-gray-700 dark:text-gray-300 font-semibold text-sm sm:text-base md:text-lg pointer-events-none px-4"
          style={{ opacity: textOpacity }}
        >
          เลื่อนเพื่อเปิดของขวัญ
        </motion.div>

        <motion.div
          className="absolute top-1 sm:top-2 left-1 sm:left-2 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing border-2 border-gray-200 dark:border-gray-700"
          drag="x"
          dragConstraints={{ left: 0, right: maxX }}
          dragElastic={0}
          dragMomentum={false}
          style={{ x }}
          animate={controls}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          whileTap={{ scale: 1.05 }}
          whileHover={{ scale: 1.02 }}
        >
          {slideComplete ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              <Gift className="text-green-500 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </motion.div>
          ) : (
            <Lock className="text-blue-500 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
          )}
        </motion.div>
      </div>
    </div>
  )
}

const LoadingAnimation = () => {
  return (
    <div className="text-center px-2 sm:px-4 w-full max-w-md mx-auto">
      <motion.div className="flex space-x-2 sm:space-x-3 md:space-x-4 justify-center items-center mb-12 sm:mb-16">
        {[0, 1, 2, 3, 4].map((index) => (
          <motion.div
            key={index}
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 shadow-lg"
            animate={{
              y: ["0%", "-200%", "0%"],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        className="h-2 sm:h-3 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 rounded-full max-w-xs sm:max-w-sm mx-auto shadow-lg mb-6 sm:mb-8"
      />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">กำลังเตรียมของขวัญ...</h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">รอสักครู่นะ เรากำลังเตรียมสิ่งพิเศษให้คุณ</p>
      </motion.div>
    </div>
  )
}

export default GiftBoxIntro
