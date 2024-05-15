"use client";

import { getNewsBySlugHandler } from "@/lib/news";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

const NewsDetailPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const [newsItem, setNewsItem] = useState<INews | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const news = await getNewsBySlugHandler(slug);
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
        <Link href={`/news/${newsItem.slug}/image`}>
          <img src={`/images/${newsItem.image}`} alt={newsItem.title} />
        </Link>
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p>{newsItem.content}</p>
    </article>
  );
};

export default NewsDetailPage;
