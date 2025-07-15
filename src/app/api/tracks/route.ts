import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SPOTIFY_URL}/tracks`)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Failed to fetch tracks from backend:", error)
    return NextResponse.json({ error: "Failed to fetch tracks" }, { status: 500 })
  }
}