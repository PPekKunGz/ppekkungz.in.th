"use client"

import Image from "next/image";
import LinkButton from '../../components/props/button'
import { FaGithub, FaYoutube, FaTwitch, FaSpotify, FaInstagram, FaCoins } from "react-icons/fa";
import { FaXTwitter, FaMoneyCheckDollar } from "react-icons/fa6";
import { TbWorldCode } from "react-icons/tb";
import Link from "next/link";
import React, { useState, useEffect } from 'react'
import Navbar from "../../components/layouts/Navbar";

interface dataType {
    user: userType,
    status: string
    activities: activitiesType[],
    banner: string
}

interface userType {
    id: string,
    bot: boolean,
    system: boolean,
    flags: number,
    username: string,
    globalName: string,
    discriminator: null,
    avatar: string,
    avatarDecoration: string,
    createdTimestamp: string,
    defaultAvatarURL: string,
    tag: string,
    avatarURL: string,
    displayAvatarURL: string
}

interface activitiesType {
    name: string,
    type: string,
    state: string,
    emoji: {
        animated: string,
        name: string,
        id: string,
        createdTimestamp: string,
        url: string,
        identifier: string,
    },
    url: string,
    details: string,
    applicationId: string,
    timestamps: {
        start: string,
        end: string,
    },
    party: {
        id: string,
    },
    syncId: string,
    assets: {
        largeText: string,
        smallText: string,
        largeImage: string,
        smallImage: string,
    },
    flags: number,
    button: string,
    createdTimestamp: string,
}

export default function Contact() {
    const [data, setData] = useState<dataType>();
    const [customActivity, setCustomActivity] = useState<activitiesType>();
    const [spotifyActivity, setSpotifyActivity] = useState<activitiesType>();


    const fetchData = async () => {
        try {
            const response = await fetch('https://developed-gracie-dimensionstudio.koyeb.app/apis/v1/discord/user?id=ppekkungz', {
                method: 'GET'
            })
            if (!response) {
                return;
            }
            const d = await response.json();
            const get: dataType = d.data;
            setData(get);
            setCustomActivity(get?.activities.find(element => element.name === 'Custom Status'))
            setSpotifyActivity(get?.activities.find(element => element.name === 'Spotify'))
        } catch (error) {
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        // <main className="bg-[url('/home.webp')] bg-cover bg-center w-screen h-screen">
        <main className="w-screen h-screen">
            <div className="backdrop-blur-sm w-full h-full bg-black/10 drop-shadow-[0_35px_35px_rgba(255,255,255,0.3)]">

                <div className="flex justify-center items-center h-full pt-[20px] px-4">
                    <div className="  bg-[#e187ff] w-[600px] h-auto rounded-xl border-solid border-4 border-[#c141c4]">
                        <div>
                            <Image
                                src={data ? (data?.banner) + "?size=600" : "https://cdn.mckimkung.in.th/cdn/1239587143098175630/background.png"}
                                alt=""
                                width={300}
                                height={300}
                                className="h-[200px] w-full object-cover bg-center rounded-t-[10px]"
                            />
                        </div>

                        <div className="flex flex-col justify-between translate-y-[-50%] pl-5 w-[9rem] h-[9rem] -mb-[100px]">
                            <Image className="w-fit h-fit rounded-full border-solid border-[5px] border-[#e187ff]"
                                src={data ? `https://cdn.discordapp.com/avatars/` + (data?.user.id) + "/" + (data?.user.avatar) : "https://media.discordapp.net/attachments/480361108977483777/1214286275436093480/SPOILER__27_20240304193129.png?ex=65f88f38&is=65e61a38&hm=6d8cec49b7230745ff5ac5405d604dfbdaeecd668d3ab57b5cbedf2196df0203&=&format=webp&quality=lossless&width=437&height=468"}
                                alt="" width={300} height={300}
                            />
                            <div className="fixed bottom-7 right-0">
                                <div className={(data?.status === "online" ? "bg-green-600" : (data?.status === "idle" ? "bg-amber-500" : (data?.status === "dnd" ? "bg-red-600" : "bg-gray-600"))) + " p-[10px] rounded-full border-solid border-[#e69aff] border-[5px]"}>
                                </div>
                            </div>

                        </div>
                        <div className='flex text-[#000]'>
                            <div className='mx-5 bg-[#f2b8ff] w-full rounded-sm my-4'>
                                <div className='mx-5 pt-3 mb-5'>
                                    <p className='text-[20px] font-bold'>
                                        {data?.user.globalName}
                                    </p>
                                    <p className='-mt-1 font-normal text-sm'>
                                        {data?.user.username}
                                    </p>
                                    {
                                        customActivity && (
                                            <p className='mt-1 font-normal text-sm'>
                                                {customActivity.emoji.name + ' ' + customActivity.state}
                                            </p>
                                        )
                                    }
                                    <div className='bg-white/50 w-full h-[1px] mt-2'></div>

                                    {/* <section className="block flex-col mt-2 overflow-auto h-32 md:h-[20rem]"> */}
                                    <section className="block flex-col mt-2 overflow-auto h-[18rem]">
                                        <p className='uppercase font-bold text-[15px]'>
                                            About Me
                                        </p>
                                        <div className='text-sm'>
                                            <p>Work at : <Link href="https://dimension-studio.net" target="_blank" className="hover:underline">@Dimension Studio</Link></p>
                                            <p>Github: <Link href="https://github.com/MCDimension" target="_blank" className="hover:underline">@MCDimension</Link></p>
                                            <p>Youtube: <Link href="https://www.youtube.com/@DimensionDev" target="_blank" className="hover:underline">@DimensionDev</Link></p>
                                            <p>Fanpage: <Link href="https://www.facebook.com/DimensionDev" target="_blank" className="hover:underline">@DimensionStudio</Link></p>
                                        </div>
                                        {spotifyActivity && (
                                            <div>
                                                <p className='flex flex-row justify-between uppercase font-bold text-[15px] -mt-0 -mb-1 items-center gap-2'>
                                                    listening music on SPOTIFY <FaSpotify size={30} />
                                                </p>
                                                <div className="text-sm">
                                                    <div className="flex justify-start items-center gap-3">
                                                        <div className="w-20 h-20">
                                                            <Image src={`https://i.scdn.co/image/${spotifyActivity.assets.largeImage.replace("spotify:", "")}`} alt="Can't Get Data Image" width={500} height={500} className="rounded-lg" />
                                                        </div>
                                                        <div className="">
                                                            <Link href={`https://open.spotify.com/track/${spotifyActivity.syncId}`} target="_blank" className="font-bold hover:underline">{spotifyActivity.details}</Link>
                                                            <p className="text-[12px]">by {spotifyActivity.state}</p>
                                                            <p className="text-[12px] -mt-1">on {spotifyActivity.assets.largeText}</p>
                                                            <p></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        }
                                        <div className='bg-white/50 w-full h-[1px] my-2'></div>
                                        <div className="grid grid-button gap-2 pt-2">
                                            <LinkButton text="PPekKunGzDev" link="https://www.github.com/PPekKunGz"><FaGithub color="#333" size={22} /></LinkButton>
                                            <LinkButton text="PPekKunGzDev" link="https://www.x.com/PPekKunGzDev"><FaXTwitter size={22} /></LinkButton>
                                            <LinkButton text="PPekKunGzChannel" link="https://www.youtube.com/@PPekKunGzChannel" ><FaYoutube color="red" size={22} /></LinkButton>
                                            <LinkButton text="Dimension Studio" link="https://www.youtube.com/@DimensionDev" ><FaYoutube color="red" size={22} /></LinkButton>
                                            <LinkButton text="PPekKunGz" link="https://www.twitch.tv/PPekKunGz"><FaTwitch color="purple" size={22} /></LinkButton>
                                            <LinkButton text="withonlypxkky._" link="https://www.instagram.com/withonlypxkky._/"><FaInstagram color="#dd2a7b" size={22} /></LinkButton>
                                            <LinkButton text="Tipme.in.th" link="https://tipme.in.th/ppekkungzchannel"><FaCoins color="#f3941d" size={22} /></LinkButton>
                                            <LinkButton text="พีเพ็กคุง.ไทย" link="https://ppekkungz.in.th"><TbWorldCode color="#45B8FF" size={22} /></LinkButton>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
