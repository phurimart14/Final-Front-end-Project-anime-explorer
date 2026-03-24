import { AnimeGrid } from "../components/AnimeGrid.tsx";
import { useOutletContext } from "react-router-dom";

export function Home() {
  const { searchQuery, filterGenres } = useOutletContext<{
    searchQuery: string;
    filterGenres: string[];
  }>();
  
  return (
    <div className="p-6 h-screen">
      <AnimeGrid searchQuery={searchQuery} filterGenres={filterGenres} />
    </div>
  );
}
