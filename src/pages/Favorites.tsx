import { AnimeCard } from "../components/AnimeCard";
import { AnimeDetailModal } from "../components/AnimeDetailModal";
import type { AnimeDetails } from "../components/AnimeDetailModal";
import type { JikanAnime, Anime } from "../types/types";
import { Heart, AlertCircle } from "lucide-react";
import { useState } from "react";

export function Favorite() {
  const [selectedAnime, setSelectedAnime] = useState<AnimeDetails | null>(null);
  const [favoriteAnime, setFavoriteAnime] = useState<Anime[]>([]);

  return (
    <div className="p-6">
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
      {favoriteAnime.length === 0 ? (
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
                You have {favoriteAnime.length} favorite anime
              </p>
              <p className="text-zinc-400 text-sm">
                Your curated collection of the best anime
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
