import { AnimeCard } from "../components/AnimeCard";
import { AnimeDetailModal } from "../components/AnimeDetailModal";
import { TrendingUp, Flame, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { AnimeDetails } from "../types/types";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";
import { fetchTrendingAnime, jikanToAnime } from "../services/animeService";

export function Trending() {
  const [selectedAnime, setSelectedAnime] = useState<AnimeDetails | null>(null);
  const [trendingAnime, setTrendingAnime] = useState<AnimeDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [averageRating, setAverageRating] = useState<string>("0");
  const [totalViews, setTotalViews] = useState<string>("0");

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

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // เลื่อนขึ้นนิ่มๆ
  };

  const itemsPerPage = 8;
  const totalPages = Math.ceil(trendingAnime.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAnime = trendingAnime.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const data = await fetchTrendingAnime();
        const mapped = data.map(jikanToAnime);
        setTrendingAnime(mapped);

        if (mapped.length > 0) {
          // 1. กรองเอาเฉพาะตัวที่มีคะแนน (ป้องกันคะแนน 0 มาดึงค่าเฉลี่ยลงเกินไป)
          const ratedAnime = mapped.filter((item) => item.rating > 0);
          if (ratedAnime.length > 0) {
            const total = ratedAnime.reduce(
              (acc, curr) => acc + curr.rating,
              0,
            );
            setAverageRating((total / ratedAnime.length).toFixed(1));
          } else {
            setAverageRating("N/A");
          }

          const totalMembers = mapped.reduce(
            (acc, curr) => acc + (curr.members ?? 0),
            0,
          );
          const formattedViews =
            totalMembers >= 1000000
              ? // แปลงเลขหลักล้านให้มี M ต่อท้าย (เช่น 2400000 -> 2.4M)
                (totalMembers / 1000000).toFixed(1) + "M"
              : (totalMembers / 1000).toFixed(1) + "K";
          setTotalViews(formattedViews);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-screen">
        <div className="text-zinc-400 font-bold text-5xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-zinc-100">Trending Now</h1>
          <Flame className="w-6 h-6 text-orange-500 animate-pulse" />
        </div>
        <p className="text-zinc-400">
          The hottest anime everyone is talking about right now
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/30 border border-purple-500/30 rounded-xl p-4">
          <p className="text-purple-400 text-sm font-medium mb-1">
            Total Views
          </p>
          <p className="text-2xl font-bold text-zinc-100">{totalViews}</p>
        </div>
        <div className="bg-gradient-to-br from-pink-900/30 to-pink-950/30 border border-pink-500/30 rounded-xl p-4">
          <p className="text-pink-400 text-sm font-medium mb-1">
            Trending Today
          </p>
          <p className="text-2xl font-bold text-zinc-100">
            {trendingAnime.length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-950/30 border border-cyan-500/30 rounded-xl p-4">
          <p className="text-cyan-400 text-sm font-medium mb-1">Avg Rating</p>
          <p className="text-2xl font-bold text-zinc-100">{averageRating}/10</p>
        </div>
      </div>

      {/* Trending Anime Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentAnime.map((anime, index) => (
          <div key={anime.id} className="relative">
            {/* Trending Badge */}
            {index < 3 && (
              <div className="absolute -top-2 -left-2 z-10 bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                <Flame className="w-3 h-3" />#{index + 1}
              </div>
            )}
            <AnimeCard
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
              onClick={() => setSelectedAnime(anime)}
            />
          </div>
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
          onClose={() => setSelectedAnime(null)}
        />
      )}
    </div>
  );
}
