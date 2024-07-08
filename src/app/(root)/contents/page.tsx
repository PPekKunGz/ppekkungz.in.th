"use client"
import React, { useEffect, useState } from 'react';
import ArticleCard from '../../../components/articlecard';
import ppekkungz from "../../../config/ppekkungz.json";
import Dimension from '../_components/pages/Dimension';

interface ArticleCardProps {
    name: string;
    date: string;
    desc: string;
    image: string;
    lang1: string;
    lang2: string;
    author: string;
    link: string;
}

export default function Blog() {
    const data = ppekkungz;
    const [isLoading, setIsLoading] = useState(true);

    setTimeout(() => {
        setIsLoading(false);
    }, 2000);
    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
                </div>
            ) : (
                <div className="min-h-screen h-full container mx-auto pt-24 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {data.map((data: any, index: number) => (
                            <div key={index}>
                                <ArticleCard
                                    image={data.image}
                                    name={data.name}
                                    author={data.author}
                                    date="Date 00, 2020"
                                    desc={data.desc}
                                    link={data.link}
                                    lang1={data.lang1}
                                    lang2={data.lang2}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="mt-5" />
                    <div id="Dimension">
                        <Dimension />
                    </div>
                </div>
            )}
        </>
    );
};