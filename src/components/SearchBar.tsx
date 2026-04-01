import { Search, Filter, Bell, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchGenres } from "../services/animeService";

interface Genre {
  mal_id: number;
  name: string;
}

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilter: (genres: string[]) => void;
  onMenuClick: () => void;
}

export function SearchBar({ onSearch, onFilter, onMenuClick }: SearchBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await fetchGenres();
        setGenres(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadGenres();
  }, []);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  const clearFilters = () => {
    setSelectedGenres([]);
  };

  return (
    <div className="relative bg-zinc-950 border-b border-zinc-800 px-6 py-4 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden text-zinc-400 hover:text-zinc-100"
        >
          <Menu className="w-6 h-6 cursor-pointer" />
        </button>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search anime..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-12 pr-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`relative p-3 rounded-lg border transition-all ${
            isFilterOpen || selectedGenres.length > 0
              ? "bg-purple-600 border-purple-500 text-white"
              : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-purple-400 hover:border-purple-500/50"
          }`}
        >
          <Filter className="w-5 h-5" />
          {selectedGenres.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-600 text-white text-xs rounded-full flex items-center justify-center font-semibold">
              {selectedGenres.length}
            </span>
          )}
        </button>
        <button className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-purple-400 hover:border-purple-500/50 transition-all relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full"></span>
        </button>
      </div>
      {/* Filter Dropdown */}
      {isFilterOpen && (
        <div className="absolute left-6 right-6 mt-4 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl shadow-black/50 p-6 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-zinc-100">
              Filter by Genre
            </h3>
            <div className="flex items-center gap-2">
              {selectedGenres.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Selected Genres */}
          {selectedGenres.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {selectedGenres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-full flex items-center gap-2"
                >
                  {genre}
                  <button
                    onClick={() => toggleGenre(genre)}
                    className="hover:bg-white/20 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
          {/* Genre Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {genres.map((genre) => (
              <button
                key={genre.mal_id}
                onClick={() => toggleGenre(genre.name)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  selectedGenres.includes(genre.name)
                    ? "bg-purple-600/20 text-purple-400 border border-purple-500/50"
                    : "bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600"
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>

          {/* Apply Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => {
                onFilter(selectedGenres);
                setIsFilterOpen(false);
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
