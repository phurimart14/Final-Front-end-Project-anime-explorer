import {
  X,
  Star,
  Play,
  Heart,
  Clock,
  Calendar,
  Tv,
  Users,
  Tag,
} from "lucide-react";
import { useState } from "react";
import type { JikanAnime, AnimeDetails } from "../types/types";

interface AnimeDetailModalProps {
  anime: AnimeDetails;
  onClose: () => void;
}

export function AnimeDetailModal({ anime, onClose }: AnimeDetailModalProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  const statusColors = {
    Airing: "bg-green-500/20 text-green-400 border-green-500/30",
    Completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    Upcoming: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-zinc-900 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden border border-zinc-800 shadow-2xl pointer-events-auto animate-in zoom-in-95 fade-in duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Image */}
          <div className="relative h-80 overflow-hidden">
            <img
              src={anime.image}
              alt={anime.title}
              className="w-full h-full object-cover aspect-[16/9] "
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
            {/* Close Button */}
            <button
              onClick={onClose}
              className="cursor-pointer absolute top-4 right-4 p-2 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 rounded-full text-zinc-300 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <span
                className={`px-3 py-1.5 rounded-full text-sm font-medium border backdrop-blur-sm ${statusColors[anime.status]}`}
              >
                {anime.status}
              </span>
            </div>

            {/* Title and Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
                {anime.title}
              </h2>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all">
                  <Play className="w-5 h-5 fill-current" />
                  Watch Now
                </button>

                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 rounded-lg border transition-all ${
                    isFavorite
                      ? "bg-pink-600 border-pink-500 text-white"
                      : "bg-zinc-900/80 backdrop-blur-sm border-zinc-700 text-zinc-300 hover:text-pink-400 hover:border-pink-500/50"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                  />
                </button>

                <button
                  onClick={() => setIsWatchLater(!isWatchLater)}
                  className={`p-3 rounded-lg border transition-all ${
                    isWatchLater
                      ? "bg-cyan-600 border-cyan-500 text-white"
                      : "bg-zinc-900/80 backdrop-blur-sm border-zinc-700 text-zinc-300 hover:text-cyan-400 hover:border-cyan-500/50"
                  }`}
                >
                  <Clock className={`w-5 h-5 ${isWatchLater}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-20rem)]">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-zinc-800 rounded-lg p-4">
                <div className="flex items-center gap-2 text-yellow-500 mb-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-xs text-zinc-400">Rating</span>
                </div>
                <p className="text-xl font-bold text-zinc-100">
                  {anime.rating.toFixed(1)}/10
                </p>
              </div>

              {anime.episodes && (
                <div className="bg-zinc-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-purple-500 mb-1">
                    <Tv className="w-4 h-4" />
                    <span className="text-xs text-zinc-400">Episodes</span>
                  </div>
                  <p className="text-xl font-bold text-zinc-100">
                    {anime.episodes}
                  </p>
                </div>
              )}

              {anime.year && (
                <div className="bg-zinc-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-cyan-500 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs text-zinc-400">Year</span>
                  </div>
                  <p className="text-xl font-bold text-zinc-100">
                    {anime.year}
                  </p>
                </div>
              )}

              {anime.studio && (
                <div className="bg-zinc-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-pink-500 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs text-zinc-400">Studio</span>
                  </div>
                  <p className="text-lg font-bold text-zinc-100">
                    {anime.studio}
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            {anime.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-zinc-100 mb-3">
                  Synopsis
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {anime.description}
                </p>
              </div>
            )}

            {/* Genres */}
            {anime.genres && anime.genres.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-5 h-5 text-purple-500" />
                  <h3 className="text-lg font-semibold text-zinc-100">
                    Genres
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {anime.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-400 text-sm font-medium rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
