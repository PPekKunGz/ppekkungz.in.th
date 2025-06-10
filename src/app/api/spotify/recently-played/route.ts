import { type NextRequest, NextResponse } from "next/server"

const SPOTIFY_TOKEN = process.env.NEXT_PUBLIC_SPOTIFY_TK

export async function GET(request: NextRequest) {
  try {
    // Check if token exists
    if (!SPOTIFY_TOKEN) {
      return NextResponse.json({ error: "Spotify token not configured" }, { status: 500 })
    }

    console.log("Making request to Spotify recently-played API...")

    const response = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=10", {
      headers: {
        Authorization: `Bearer ${SPOTIFY_TOKEN}`,
        "Content-Type": "application/json",
      },
    })

    console.log("Spotify recently-played API response status:", response.status)

    if (!response.ok) {
      // Get the response text to see what error Spotify is returning
      const errorText = await response.text()
      console.error("Spotify API error response:", errorText)

      // Try to parse as JSON, fallback to text
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { message: errorText }
      }

      return NextResponse.json(
        {
          error: `Spotify API error: ${response.status}`,
          details: errorData,
          status: response.status,
        },
        { status: response.status },
      )
    }

    // Check content type before parsing
    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await response.text()
      console.error("Unexpected content type:", contentType)
      console.error("Response body:", textResponse)
      return NextResponse.json(
        {
          error: "Unexpected response format from Spotify",
          contentType,
          body: textResponse.substring(0, 200),
        },
        { status: 500 },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching recently played tracks:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch recently played tracks",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
