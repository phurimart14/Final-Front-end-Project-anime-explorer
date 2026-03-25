import { AnimeCard } from "../components/AnimeCard";
import { AnimeDetailModal } from "../components/AnimeDetailModal";
import type { AnimeDetails } from "../types/types";
import { Heart, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";

export function Favorite() {
  const [selectedAnime, setSelectedAnime] = useState<AnimeDetails | null>(null);
  // const [favoriteAnime, setFavoriteAnime] = useState<AnimeDetails[]>([]);
  const {
    favorites,
    removeFavorite,
    addWatchLater,
    removeWatchLater,
    isFavorite,
    isWatchLater,
  } = useOutletContext<{
    favorites: AnimeDetails[];
    removeFavorite: (id: number) => void;
    addWatchLater: (anime: AnimeDetails) => void;
    removeWatchLater: (id: number) => void;
    isFavorite: (id: number) => boolean;
    isWatchLater: (id: number) => boolean;
  }>();

  return (
    <div className="p-6 mt-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-gradient-to-r from-pink-600 to-rose-600 rounded-xl">
            <Heart className="w-6 h-6 text-white fill-current" />
          </div>
          <h1 className="text-3xl font-bold text-zinc-100">Favorites</h1>
        </div>
        <p className="text-zinc-400">Your all-time favorite anime collection</p>
      </div>

      {/* Empty State or Content */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="p-6 bg-zinc-900 rounded-full mb-6">
            <AlertCircle className="w-12 h-12 text-zinc-600" />
          </div>
          <h3 className="text-xl font-semibold text-zinc-300 mb-2">
            No favorites yet
          </h3>
          <p className="text-zinc-500 text-center max-w-md">
            Click the heart icon on any anime card to add it to your favorites
          </p>
        </div>
      ) : (
        <div>
          {/* Info Banner */}
          <div className="bg-gradient-to-r from-pink-900/30 to-rose-900/30 border border-pink-500/30 rounded-xl p-4 mb-6 flex items-center gap-3">
            <Heart className="w-5 h-5 text-pink-400 fill-current" />
            <div>
              <p className="text-zinc-100 font-medium">
                You have {favorites.length} favorite anime
              </p>
              <p className="text-zinc-400 text-sm">
                Your curated collection of the best anime
              </p>
            </div>
          </div>

          {/* Favorites Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((anime) => (
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
                  removeFavorite(anime.id);
                  toast.error(`Removed "${anime.title}" from favorites`);
                }}
                onWatchLater={() =>
                  isWatchLater(anime.id)
                    ? removeWatchLater(anime.id)
                    : addWatchLater(anime)
                }
                onClick={() => setSelectedAnime(anime)}
              />
            ))}
          </div>
        </div>
      )}

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
