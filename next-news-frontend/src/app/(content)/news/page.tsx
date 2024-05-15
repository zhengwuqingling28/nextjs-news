"use client";

import { useState, useEffect } from "react";
import NewsList from "@/components/news/news-list";

const GetNewsHandler = async (): Promise<INews[]> => {
  const res = await fetch(`http://localhost:8000/news`, {
    method: "GET",
  });
  const data: INews[] = await res.json();
  return data;
};

const NewsPage = () => {
  const [newsList, setNewsList] = useState<INews[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetNewsHandler();
      setNewsList(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>News Page</h1>
      <NewsList news={newsList} />
    </>
  );
};

export default NewsPage;
