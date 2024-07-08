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

export const ppekkungzConfig: {
  name: {
    author: string;
    name: string;
  };
  lang: {
    main: string;
    sec: string;
  };
  description: string;
  image: string;
    } = {
  name: {
    author: "",
    name: "",
  },
  lang: {
    main: "https://i.ibb.co/TvK6pKT/IMG-4960.jpg",
    sec: "https://i.ibb.co/CQSqV3s/IMG-4975.jpg",
  },
  description: "",
  image: "",
};

export type ppekkungzConfig = typeof ppekkungzConfig;
