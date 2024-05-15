"use client";

import { getNewsBySlugHandler } from "@/lib/news";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const InterceptingImagePage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const [newsItem, setNewsItem] = useState<INews | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

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
    <>
      <div className="modal-backdrop" onClick={router.back}>
        <dialog className="modal" open>
          <div className="fullscreen-image">
            <img src={`/images/${newsItem.image}`} alt={newsItem.title} />
          </div>
        </dialog>
      </div>
    </>
  );
};

export default InterceptingImagePage;
