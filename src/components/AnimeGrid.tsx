import { useState, useEffect } from "react";
import { HeroSection } from "./HeroSection";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimeDetailModal } from "./AnimeDetailModal";
import { AnimeCard } from "./AnimeCard";
import type { JikanAnime, AnimeDetails } from "../types/types";
import { toast } from "sonner";
import { useOutletContext } from "react-router-dom";
import {
  fetchSeasonNow,
  fetchSearchAnime,
  jikanToAnime,
} from "../services/animeService";

interface AnimeGridProps {
  searchQuery: string;
  filterGenres: string[];
}

export function AnimeGrid({ searchQuery, filterGenres }: AnimeGridProps) {
  const [animeData, setAnimeData] = useState<AnimeDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnime, setSelectedAnime] = useState<AnimeDetails | null>(null);

  const {
    addFavorite,
    removeFavorite,
    addWatchLater,
    removeWatchLater,
    isFavorite,
    isWatchLater,
  } = useOutletContext<{
    addFavorite: (anime: AnimeDetails) => void;
    removeFavorite: (id: number) => void;
    addWatchLater: (anime: AnimeDetails) => void;
    removeWatchLater: (id: number) => void;
    isFavorite: (id: number) => boolean;
    isWatchLater: (id: number) => boolean;
  }>();

  const [heroAnime, setHeroAnime] = useState<JikanAnime | null>(null);

  const filteredAnime = animeData.filter((anime) => {
    // เช็ค search query
    const matchSearch = searchQuery
      ? anime.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchGenre =
      filterGenres.length > 0
        ? filterGenres.every((g) => anime.genres?.includes(g))
        : true;
    return matchSearch && matchGenre;
  });

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredAnime.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAnime = filteredAnime.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleAnimeClick = (anime: AnimeDetails) => {
    setSelectedAnime(anime);
  };

  const handleCloseModal = () => {
    setSelectedAnime(null);
  };

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        if (searchQuery) {
          // ถ้ามี searchQuery → ยิง search API
          const data = await fetchSearchAnime(searchQuery);
          setAnimeData(data.map(jikanToAnime));
        } else {
          // ถ้าไม่มี searchQuery → ดึง popular season
          const data = await fetchSeasonNow();
          const sorted = data.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
          setHeroAnime(sorted[0]);
          setAnimeData(sorted.map(jikanToAnime));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    const debounce = setTimeout(fetchAnime, 500);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterGenres]);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-screen">
        <div className="text-zinc-400 font-bold text-5xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/*Herosection*/}
      {/* ซ่อน Hero เมื่อมี search หรือ filter */}
      {!searchQuery && filterGenres.length === 0 && (
        <HeroSection
          anime={heroAnime}
          isFavorite={heroAnime ? isFavorite(heroAnime.mal_id) : false}
          isWatchLater={heroAnime ? isWatchLater(heroAnime.mal_id) : false}
          onFavorite={() => {
            if (!heroAnime) return;
            const anime = jikanToAnime(heroAnime); // ← ใช้ jikanToAnime แทนสร้าง object ใหม่
            isFavorite(heroAnime.mal_id)
              ? (removeFavorite(heroAnime.mal_id),
                toast.error(`Removed "${heroAnime.title}" from favorites`))
              : (addFavorite(anime),
                toast.success(`Added "${heroAnime.title}" to favorites`));
          }}
          onWatchLater={() => {
            if (!heroAnime) return;
            const anime = jikanToAnime(heroAnime); // ← ใช้ jikanToAnime แทนสร้าง object ใหม่
            isWatchLater(heroAnime.mal_id)
              ? (removeWatchLater(heroAnime.mal_id),
                toast.error(`Removed "${heroAnime.title}" from favorites`))
              : (addWatchLater(anime),
                toast.success(`Added "${heroAnime.title}" to favorites`));
          }}
        />
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">
          {searchQuery || filterGenres.length > 0
            ? `Results (${filteredAnime.length})`
            : "Popular This Season"}
        </h2>
        <p className="text-zinc-500">
          {searchQuery || filterGenres.length > 0
            ? `Showing results for "${searchQuery}"`
            : "Discover the most watched anime right now"}
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
            isFavorite={isFavorite(anime.id)}
            isWatchLater={isWatchLater(anime.id)}
            onFavorite={() => {
              if (isFavorite(anime.id)) {
                removeFavorite(anime.id);
                toast.error(`Removed "${anime.title}" from favorites`);
              } else {
                addFavorite(anime);
                toast.success(`Added "${anime.title}" to favorites`);
              }
            }}
            onWatchLater={() => {
              if (isWatchLater(anime.id)) {
                removeWatchLater(anime.id);
                toast.error(`Removed "${anime.title}" from watch later`);
              } else {
                addWatchLater(anime);
                toast.success(`Added "${anime.title}" to watch later`);
              }
            }}
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
        <AnimeDetailModal
          anime={selectedAnime}
          onClose={handleCloseModal}
          isFavorite={selectedAnime ? isFavorite(selectedAnime.id) : false}
          isWatchLater={selectedAnime ? isWatchLater(selectedAnime.id) : false}
          onFavorite={() => {
            if (!selectedAnime) return;
            isFavorite(selectedAnime.id)
              ? removeFavorite(selectedAnime.id)
              : addFavorite(selectedAnime); // ← ส่ง selectedAnime ตรงๆ ได้เลย
            isFavorite(selectedAnime.id)
              ? toast.error(`Removed "${selectedAnime.title}" from favorites`)
              : toast.success(`Added "${selectedAnime.title}" to favorites`);
          }}
          onWatchLater={() => {
            if (!selectedAnime) return;
            isWatchLater(selectedAnime.id)
              ? removeWatchLater(selectedAnime.id)
              : addWatchLater(selectedAnime); // ← ส่ง selectedAnime
            isWatchLater(selectedAnime.id)
              ? toast.error(`Removed "${selectedAnime.title}" from favorites`)
              : toast.success(`Added "${selectedAnime.title}" to favorites`);
          }}
        />
      )}
    </div>
  );
}
