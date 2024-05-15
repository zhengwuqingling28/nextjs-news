import Link from "next/link";

import { getAvailableNewsYears } from "@/lib/news";

const ArchivePage = async () => {
  const links: number[] = await getAvailableNewsYears();

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link: number) => (
            <li key={link}>
              <Link href={`/archive/${link}`}>{link}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default ArchivePage;
