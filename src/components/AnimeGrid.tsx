import { useState } from "react";
import { HeroSection } from "./HeroSection";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimeDetailModal } from "./AnimeDetailModal";
import type { AnimeDetails } from "./AnimeDetailModal";
import { AnimeCard } from "./AnimeCard";

interface Anime {
  id: number;
  title: string;
  image: string;
  rating: number;
  status: "Airing" | "Completed" | "Upcoming";
  episodes?: number;
  description?: string;
  genres?: string[];
  year?: number;
  studio?: string;
}

const animeData: Anime[] = [];

export function AnimeGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnime, setSelectedAnime] = useState<AnimeDetails | null>(null);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(animeData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAnime = animeData.slice(startIndex, endIndex);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleAnimeClick = (anime: Anime) => {
    setSelectedAnime(anime);
  };

  const handleCloseModal = () => {
    setSelectedAnime(null);
  };

  return (
    <div className="p-6">
      {/*Herosection*/}
      <HeroSection />

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">
          Popular This Season
        </h2>
        <p className="text-zinc-500">
          Discover the most watched anime right now
        </p>
      </div>

      {/*Anime grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentAnime.map((anime) => (
          <AnimeCard
            key={anime.id}
            title={anime.title}
            image={anime.image}
            rating={anime.rating}
            status={anime.status}
            episodes={anime.episodes}
            onClick={() => handleAnimeClick(anime)}
          />
        ))}
      </div>
      {/* Pagination */}
      <div className="mt-8 flex items-center justify-center gap-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-purple-400 hover:border-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-zinc-400 disabled:hover:border-zinc-800 transition-all flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`w-10 h-10 rounded-lg transition-all ${
                currentPage === page
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border border-purple-500"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-purple-400 hover:border-purple-500/50"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-purple-400 hover:border-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-zinc-400 disabled:hover:border-zinc-800 transition-all flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Anime Detail Modal */}
      {selectedAnime && (
        <AnimeDetailModal anime={selectedAnime} onClose={handleCloseModal} />
      )}
    </div>
  );
}
