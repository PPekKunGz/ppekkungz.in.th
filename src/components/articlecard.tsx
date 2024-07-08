import React from 'react';
import { Badge } from "@/components/ui/badge"
import Link from 'next/link';

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

const ArticleCard: React.FC<ArticleCardProps> = ({ name, date, desc, image, author, link, lang1, lang2 }) => {
  return (
    <div className="dark:bg-black/20 bg-zinc-400 border-b-4 text-white p-6 rounded-lg shadow-md">
      <Link href={`${link}`} target="_blank" className="flex items-center justify-center">
        <img src={image} alt={name} className="w-fit h-64 object-cover rounded-t-lg mb-4" />
      </Link>
      <div className="flex flex-row items-start justify-start">
        <Badge variant="secondary">{author}</Badge>&nbsp;
        <p className="text-sm text-accent-foreground mb-2">• {date}</p>
      </div>
      <p>{desc}</p>
      <div className="flex pt-4 gap-2">
      <Badge variant="destructive">{lang1}</Badge>
      <Badge variant="secondary">{lang2}</Badge>
      </div>
    </div>
  );
};

export default ArticleCard;