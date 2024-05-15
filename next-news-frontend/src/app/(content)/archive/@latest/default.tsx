import NewsList from "@/components/news/news-list";

const LatestPage = async () => {
  const res = await fetch(
    `http://localhost:8000/news?_sort=date&_order=asc&_limit=3`,
    {
      method: "GET",
    }
  );

  const news = await res.json();

  return <NewsList news={news} />;
};

export default LatestPage;
