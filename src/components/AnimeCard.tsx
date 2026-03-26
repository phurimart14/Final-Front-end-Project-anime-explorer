import { Star, Play, Heart, Clock } from "lucide-react";

interface AnimeCardProps {
  title: string;
  image: string;
  rating: number;
  status: "Airing" | "Completed" | "Upcoming";
  episodes?: number;
  isFavorite?: boolean; // ← เพิ่ม
  isWatchLater?: boolean; // ← เพิ่ม
  onFavorite?: () => void; // ← เพิ่ม
  onWatchLater?: () => void; // ← เพิ่ม
  onClick?: () => void;
}
export function AnimeCard({
  title,
  image,
  rating,
  status,
  episodes,
  isFavorite, // ← เพิ่ม
  isWatchLater, // ← เพิ่ม
  onFavorite, // ← เพิ่ม
  onWatchLater, // ← เพิ่ม
  onClick,
}: AnimeCardProps) {
  // const [isFavorite, setIsFavorite] = useState(false);
  // const [isWatchLater, setIsWatchLater] = useState(false); ไม่ได้ใช้เพราะรับเป็น prop มาแล้ว

  const statusColors = {
    Airing: "bg-green-500/20 text-green-400 border-green-500/30",
    Completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    Upcoming: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };

  return (
    <div
      className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-800">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-6 h-6 fill-current" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavorite?.();
            }}
            className={`p-2 rounded-lg backdrop-blur-sm border transition-all ${
              isFavorite
                ? "bg-pink-600 border-pink-500 text-white"
                : "bg-zinc-900/80 border-zinc-700 text-zinc-300 hover:text-pink-400 hover:border-pink-500/50"
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onWatchLater?.();
            }}
            className={`p-2 rounded-lg backdrop-blur-sm border transition-all ${
              isWatchLater
                ? "bg-cyan-600 border-cyan-500 text-white"
                : "bg-zinc-900/80 border-zinc-700 text-zinc-300 hover:text-cyan-400 hover:border-cyan-500/50"
            }`}
          >
            <Clock className={`w-4 h-4 ${isWatchLater}`} />
          </button>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${statusColors[status]}`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-zinc-100 font-semibold mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
          {title}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            <span className="text-sm font-medium text-zinc-100">
              {rating.toFixed(1)}
            </span>
          </div>

          {episodes && (
            <span className="text-xs text-zinc-500">{episodes} episodes</span>
          )}
        </div>
      </div>
    </div>
  );
}
