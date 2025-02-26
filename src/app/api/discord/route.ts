import { NextResponse } from "next/server";

const DISCORD_API_URL = "https://discord.com/api/v9";
const BOT_TOKEN = process.env.NEXT_PUBLIC_BOT_TOKEN; 
const CHANNEL_ID = process.env.NEXT_PUBLIC_CHANNEL_ID;

export async function GET() {
    console.log("BOT_TOKEN:", BOT_TOKEN ? "Loaded" : "Missing");
    console.log("CHANNEL_ID:", CHANNEL_ID ? "Loaded" : "Missing");
    if (!BOT_TOKEN || !CHANNEL_ID) {
        return NextResponse.json(
            { error: "BOT_TOKEN or CHANNEL_ID is missing" },
            { status: 500 }
        );
    }

    try {
        const response = await fetch(
            `${DISCORD_API_URL}/channels/${CHANNEL_ID}/messages`,
            {
                headers: {
                    Authorization: `Bot ${BOT_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json(
                { error: `Discord API Error: ${errorText}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
