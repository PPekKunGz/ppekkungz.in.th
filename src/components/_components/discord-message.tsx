"use client";
import { Marquee } from "@/components/magicui/marquee";
import React, { useEffect, useState } from "react";

export default function DiscordMessage() {
    const [discordMessages, setDiscordMessages] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/discord");
                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || "Failed to fetch messages");
                }

                // console.log("Fetched Data:", result);
                setDiscordMessages(result);
            } catch (error: any) {
                console.error("Error fetching messages:", error);
                setError(error.message);
            } finally {
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-4 text-center">
            <div className="space-y-2">
                <span className="font-five" data-aos="fade-up" data-aos-duration="2000">Dimension Studio</span>
                <p className="font-clash uppercase underline font-semibold" data-aos="fade-up" data-aos-duration="2500">SSkins Reviews</p>
            </div>
            <Marquee pauseOnHover={false} className={`[--gap:2rem] [--duration:200s] overflow-hidden p-5 text-zinc-500 text-xl tracking-wider`} data-aos="fade-up" data-aos-duration="2500">
                <div className="flex items-center justify-center gap-8">
                    {discordMessages.map((msg, index) => (
                        <span key={index} className="mx-2">
                            <strong className="font-clash font-medium">💐{msg.author?.username}:</strong>{" "}
                            {msg.content.split("<")[0]}
                        </span>
                    ))}
                </div>
            </Marquee>
        </div>
    );
}
