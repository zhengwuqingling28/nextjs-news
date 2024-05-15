import NewsList from "@/components/news/news-list";

const FilterNewsPage = async ({ params }: { params: { year: string } }) => {
  const { year } = params;
  const res = await fetch(`http://localhost:8000/news?date_like=${year}`, {
    method: "GET",
  });

  const news = await res.json();

  return (
    <>
      <NewsList news={news} />
    </>
  );
};

export default FilterNewsPage;
