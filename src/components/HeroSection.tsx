import { Play, Star, Clock, Heart } from "lucide-react";
import type { JikanAnime } from "../types/types";

interface HeroSectionProps {
  anime: JikanAnime | null;
  isFavorite: boolean;
  isWatchLater: boolean;
  onFavorite: () => void;
  onWatchLater: () => void;
}

export function HeroSection({
  anime,
  isFavorite,
  isWatchLater,
  onFavorite,
  onWatchLater,
}: HeroSectionProps) {
  const statusColors = {
    Airing: "bg-green-500/20 text-green-400 border-green-500/30",
    Completed: "bg-blue-500/20 text-blue-500 border-blue-500/10",
    Upcoming: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };

  return (
    <div className="relative h-125 overflow-hidden rounded-2xl mb-8">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={anime?.images.jpg.large_image_url}
          alt={anime?.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-end p-6 sm:p-8 md:p-12 lg:p-16">
        <div className="w-full max-w-3xl">
          {/* Badge */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <span className="px-3 py-1  md:px-4 md:py-1.5 text-[10px] md:text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full">
              RECOMMENDED
            </span>
            <span
              className={`px-4 py-1.5 md:px-4 md:py-1.5 text-[10px] md:text-xs font-medium rounded-full border transition-colors ${statusColors[anime?.status === "Currently Airing" ? "Airing" : anime?.status === "Not yet aired" ? "Upcoming" : "Completed"]}`}
            >
              {anime?.status === "Currently Airing"
                ? "Airing"
                : anime?.status === "Not yet aired"
                  ? "Upcoming"
                  : "Completed"}
            </span>
          </div>
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl  lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
            {anime?.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-6 text-xs md:text-sm text-zinc-300 font-medium">
            <div className="flex items-center gap-1">
              {anime?.score ? (
                <>
                  <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold">{anime?.score}</span>
                </>
              ) : (
                <span className="font-semibold text-zinc-500">
                  Pending Score
                </span>
              )}
            </div>
            <span>•</span>
            <span>
              {anime?.year ?? anime?.aired?.prop?.from?.year ?? "TBA"}
            </span>
            <span>•</span>
            <span>{anime?.genres?.map((g) => g.name).join(", ")}</span>
            <span>•</span>
            <span>{anime?.episodes ?? "?"} Episodes</span>
          </div>

          {/* Description */}
          <p className="text-zinc-400 text-sm md:text-lg mb-8 line-clamp-2 md:line-clamp-3 max-w-2xl font-light">
            {anime?.synopsis}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            {/* watch button */}
            <button className="px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 text-sm md:text-base shadow-lg shadow-purple-600/20">
              <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
              Watch Now
            </button>
            {/* Heart Button */}
            <button
              onClick={onFavorite}
              className={` p-3 rounded-lg backdrop-blur-sm border transition-all ${
                isFavorite
                  ? "bg-pink-600 border-pink-500 text-white"
                  : "bg-zinc-900/80 border-zinc-700 text-zinc-300 hover:text-pink-400 hover:border-pink-500/50"
              } `}
            >
              <Heart
                className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
              />
            </button>

            {/* Watch Later Button */}
            <button
              onClick={onWatchLater}
              className={`p-3 rounded-lg transition-all backdrop-blur-sm border ${
                isWatchLater
                  ? "bg-cyan-600 border-cyan-500 text-white"
                  : "bg-zinc-900/80 border-zinc-700 text-zinc-300 hover:text-cyan-400 hover:border-cyan-500/50"
              }`}
            >
              <Clock
                className={`w-5 h-5 ${isWatchLater ? "text-white " : " "}`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
