"use client";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

const GetNewsBySlugHandler = async (slug: string): Promise<INews> => {
  const res = await fetch(`http://localhost:8000/news?slug=${slug}`, {
    method: "GET",
  });

  const data = await res.json();
  const news: INews = { ...data[0] };
  return news;
};

const NewsDetailPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const [newsItem, setNewsItem] = useState<INews | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const news = await GetNewsBySlugHandler(slug);
        setNewsItem(news);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!newsItem || Object.keys(newsItem).length === 0) {
    notFound();
  }

  return (
    <article className="news-article">
      <header>
        <img src={`/images/${newsItem.image}`} alt={newsItem.title} />
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p>{newsItem.content}</p>
    </article>
  );
};

export default NewsDetailPage;
