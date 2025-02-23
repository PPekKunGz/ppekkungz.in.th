import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RefreshCcw } from "lucide-react"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-transparent text-center px-4">
            <h1 className="text-6xl md:text-8xl font-extrabold text-primary mb-4">Oops! 404</h1>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">You've been rickrolled by the 404!</h2>
            <div className="relative w-64 h-64 md:w-96 md:h-96 mb-8">
                <Image
                    src="https://media.tenor.com/x8v1oNUOmg4AAAAd/rickroll-roll.gif"
                    alt="Rick Astley dancing"
                    layout="fill"
                    objectFit="cover"
                    draggable="false"
                    className="rounded-full"
                />
            </div>
            <p className="text-xl text-primary mb-8">
                The page you're looking for is never gonna give you up, never gonna let you down, never gonna run around and
                desert you.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
                <Link href="/">
                    <Button variant="outline" size="lg" className="font-semibold">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Go back home
                    </Button>
                </Link>
                <Button
                    variant="outline"
                    size="lg"
                    className="font-semibold text-whprimaryite border-primary hover:bg-primary hover:text-purple-500"
                >
                    <RefreshCcw className="w-5 h-5 mr-2" />
                    Try again
                </Button>
            </div>
        </div>
    )
}

