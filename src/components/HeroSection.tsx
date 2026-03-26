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
  return (
    <div className="relative h-[500px] overflow-hidden rounded-2xl mb-8">
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
      <div className="relative h-full flex items-end p-8 md:p-12">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-full">
              RECOMMENDED
            </span>
            <span className="px-4 py-1.5 bg-green-500/20 text-green-400 text-sm font-medium rounded-full border border-green-500/30">
              {anime?.status === "Currently Airing" ? "Airing" : anime?.status}
            </span>
          </div>
          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
            {anime?.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-4 text-zinc-300">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
              <span className="font-semibold">{anime?.score}</span>
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
          <p className="text-zinc-400 text-lg mb-6 line-clamp-3">
            {anime?.synopsis}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            {/* watch button */}
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg flex items-center gap-2 transition-all transform hover:scale-105">
              <Play className="w-5 h-5 fill-current" />
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
              <Clock className={`w-5 h-5 ${isWatchLater}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
