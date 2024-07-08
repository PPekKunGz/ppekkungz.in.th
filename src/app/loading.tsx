"use client";

import { useState } from "react";

export default function Loading() {
    const [isLoading, setIsLoading] = useState(true);
    setTimeout(() => {
        setIsLoading(false);
    }, 4000);
    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-center h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
                    </div>
                </>
            )}
        </>
    )
}