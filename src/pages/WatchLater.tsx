import { AnimeCard } from "../components/AnimeCard";
import { AnimeDetailModal } from "../components/AnimeDetailModal";
import type { AnimeDetails } from "../types/types";
import { Clock, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";

export function WatchLater() {
  const [selectedAnime, setSelectedAnime] = useState<AnimeDetails | null>(null);

  const {
    watchLater,
    addFavorite,
    removeWatchLater,
    isFavorite,
    removeFavorite,
    isWatchLater,
  } = useOutletContext<{
    watchLater: AnimeDetails[];
    addFavorite: (anime: AnimeDetails) => void;
    addWatchLater: (anime: AnimeDetails) => void;
    removeWatchLater: (id: number) => void;
    removeFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
    isWatchLater: (id: number) => boolean;
  }>();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-zinc-100">Watch Later</h1>
        </div>
        <p className="text-zinc-400">
          Your saved anime to watch when you have time
        </p>
      </div>

      {/* Empty State or Content */}
      {watchLater.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="p-6 bg-zinc-900 rounded-full mb-6">
            <AlertCircle className="w-12 h-12 text-zinc-600" />
          </div>
          <h3 className="text-xl font-semibold text-zinc-300 mb-2">
            No anime saved yet
          </h3>
          <p className="text-zinc-500 text-center max-w-md">
            Click the clock icon on any anime card to add it to your watch later
            list
          </p>
        </div>
      ) : (
        <>
          {/* Info Banner */}
          <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-xl p-4 mb-6 flex items-center gap-3">
            <Clock className="w-5 h-5 text-cyan-400" />
            <div>
              <p className="text-zinc-100 font-medium">
                You have {watchLater.length} anime in your watch later list
              </p>
              <p className="text-zinc-400 text-sm">
                Keep track of anime you want to watch
              </p>
            </div>
          </div>

          {/* Watch Later Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {watchLater.map((anime) => (
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
                  removeWatchLater(anime.id);
                  toast.error(`Removed "${anime.title}" from watch later`);
                }}
                onClick={() => setSelectedAnime(anime)}
              />
            ))}
          </div>
        </>
      )}

      {/* Anime Detail Modal */}
      {selectedAnime && (
        <AnimeDetailModal
          anime={selectedAnime}
          onClose={() => setSelectedAnime(null)}
          isFavorite={isFavorite(selectedAnime.id)}
          isWatchLater={isWatchLater(selectedAnime.id)}
          onFavorite={() => {
            if (isFavorite(selectedAnime.id)) {
              removeFavorite(selectedAnime.id);
              toast.error(`Removed "${selectedAnime.title}" from favorites`);
            } else {
              addFavorite(selectedAnime);
              toast.success(`Added "${selectedAnime.title}" to favorites`);
            }
          }}
          onWatchLater={() => {
            if (isWatchLater(selectedAnime.id)) {
              removeWatchLater(selectedAnime.id);
              toast.error(`Removed "${selectedAnime.title}" from watch later`);
            }
          }}
        />
      )}
    </div>
  );
}
