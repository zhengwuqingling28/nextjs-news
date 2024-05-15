import Link from "next/link";

import { getAvailableNewsYears } from "@/lib/news";
import NewsList from "@/components/news/news-list";

const FilterNewsPage = async ({ params }: { params: { year: string } }) => {
  const { year } = params;
  const res = await fetch(`http://localhost:8000/news?date_like=${year}`, {
    method: "GET",
  });

  const news = await res.json();

  const links: number[] = await getAvailableNewsYears();

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links &&
              links.map((link: number) => (
                <li key={link}>
                  <Link href={`/archive/${link}`}>{link}</Link>
                </li>
              ))}
          </ul>
        </nav>
      </header>
      <NewsList news={news} />
    </>
  );
};

export default FilterNewsPage;
