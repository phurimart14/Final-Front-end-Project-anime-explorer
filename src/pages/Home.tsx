import { AnimeGrid } from "../components/AnimeGrid";
import { useOutletContext } from "react-router-dom";

export function Home() {
  const { searchQuery, filterGenres } = useOutletContext<{
    searchQuery: string;
    filterGenres: string[];
  }>();

  return (
    <div className="p-6">
      <AnimeGrid searchQuery={searchQuery} filterGenres={filterGenres} />
    </div>
  );
}
