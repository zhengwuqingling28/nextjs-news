import Link from "next/link";

interface IProps {
  news: INews[];
}

const NewsList = (props: IProps) => {
  const { news } = props;
  return (
    <ul className="news-list">
      {news.map((newsItem: INews) => (
        <li key={newsItem.id}>
          <Link href={`/news/${newsItem.slug}`}>
            <img src={`/images/${newsItem.image}`} alt={newsItem.title} />
            <span>{newsItem.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NewsList;
