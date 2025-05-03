'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import toast, { Toaster } from 'react-hot-toast';
import { Calendar, Gift, Send, Clock, PiggyBank, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function BirthdayWebsite() {
    // State variables
    const [name, setName] = useState('@PPekkunGzDev');
    const [birthdayDate, setBirthdayDate] = useState('2025-06-23T00:00:00');
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0});
    const [wish, setWish] = useState('');
    const [webhookUrl, setWebhookUrl] = useState('');
    const [profileImage, setProfileImage] = useState('avatar.png');
    const [imageUploading, setImageUploading] = useState(false);

    // Calculate time left until birthday
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const birthday = new Date(birthdayDate);
            const diff = birthday.getTime() - now.getTime();

            if (diff <= 0) {
                // Birthday has passed
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                });
                return;
            }

            // Calculate time units
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, [birthdayDate]);

    // Function to send wish to Discord webhook
    const sendWishToDiscord = async () => {
        if (!webhookUrl || !wish) {
            toast.error('Please enter both webhook URL and your wish!');
            return;
        }

        try {
            toast.success('Wish sent successfully!');
            setWish('');
        } catch (error) {
            toast.error('Failed to send wish. Please try again.');
        }
    };

    return (
        <div className="min-h-screen p-4 sm:p-8">
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#fff',
                        color: '#333',
                    },
                    success: {
                        iconTheme: {
                            primary: '#10b981',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-purple-800 mb-2">Happy Birthday to me!</h1>
                    <p className="text-lg text-gray-600">-</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" /> Profile
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                            <div className="relative w-32 h-32 mb-4">
                                <img src={profileImage} alt="Profile" draggable="false" className="rounded-full object-cover w-full h-full border-4 border-purple-300"/>
                            </div>

                            <Input
                                value={name}
                                readOnly
                                className="text-center font-medium text-lg mb-2"
                            />

                            <div className="w-full mt-4">
                                <div className="flex flex-col">
                                    <Link href={"https://ezdn.app/ppekkungz"} className="flex gap-2 items-center"><PiggyBank color='pink' size={30} className=" hover:bg-pink-50/20 duration-500 rounded-full p-[3px]"/> สนับสนุนได้ที่</Link>
                                    <Link href={"https://www.instagram.com/withonlypxkky._/"} className="flex gap-2 items-center"><Instagram color='pink' size={30} className=" hover:bg-pink-50/20 duration-500 rounded-full p-[3px]"/> ช่องทางการติดตาม</Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Countdown Section */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" /> Countdown to Birthday
                            </CardTitle>
                            <CardDescription>
                                Time remaining until the special day
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-4 gap-2 text-center">
                                <div className="bg-purple-100 p-4 rounded-lg">
                                    <p className="text-3xl font-bold text-purple-800">{timeLeft.days}</p>
                                    <p className="text-sm text-purple-600">Days</p>
                                </div>
                                <div className="bg-pink-100 p-4 rounded-lg">
                                    <p className="text-3xl font-bold text-pink-800">{timeLeft.hours}</p>
                                    <p className="text-sm text-pink-600">Hours</p>
                                </div>
                                <div className="bg-blue-100 p-4 rounded-lg">
                                    <p className="text-3xl font-bold text-blue-800">{timeLeft.minutes}</p>
                                    <p className="text-sm text-blue-600">Minutes</p>
                                </div>
                                <div className="bg-green-100 p-4 rounded-lg">
                                    <p className="text-3xl font-bold text-green-800">{timeLeft.seconds}</p>
                                    <p className="text-sm text-green-600">Seconds</p>
                                </div>
                            </div>

                            {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && (
                                <div className="mt-6 text-center">
                                    <h3 className="text-2xl font-bold text-purple-800">🎉 It's Your Birthday! 🎉</h3>
                                    <p className="text-lg text-gray-600 mt-2">Have an amazing day!</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Wish Sender Section */}
                    <Card className="md:col-span-3">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Gift className="h-5 w-5" /> Send Birthday Wishes
                            </CardTitle>
                            <CardDescription>
                                Send your wishes to Discord via webhook
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-5">
                                {/* <div>
                                    <Label htmlFor="webhook-url">Discord Webhook URL</Label>
                                    <Input
                                        id="webhook-url"
                                        placeholder="https://discord.com/api/webhooks/..."
                                        value={webhookUrl}
                                        onChange={(e) => setWebhookUrl(e.target.value)}
                                    />
                                </div> */}
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="wish" className="">Your Birthday Wish</Label>
                                    <Textarea
                                        id="wish"
                                        placeholder="Write your birthday wishes here..."
                                        value={wish}
                                        onChange={(e) => setWish(e.target.value)}
                                        className="min-h-32"
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full gap-2"
                                onClick={sendWishToDiscord}
                            >
                                <Send className="h-4 w-4" /> Send Wish
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}