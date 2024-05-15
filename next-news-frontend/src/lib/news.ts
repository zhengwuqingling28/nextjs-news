const GetNewsHandler = async (): Promise<INews[]> => {
  const res = await fetch(`http://localhost:8000/news`, {
    method: "GET",
  });
  const data: INews[] = await res.json();
  return data;
};

export async function getAvailableNewsYears() {
  const news = await GetNewsHandler();
  return news
    .reduce((years, news) => {
      const year: string = new Date(news.date).getFullYear();
      if (!years.includes(year)) {
        years.push(year);
      }
      return years;
    }, [])
    .sort((a, b) => b - a);
}
