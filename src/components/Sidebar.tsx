import { Home, TrendingUp, Clock, Star, X } from "lucide-react";
import { Link, useLocation } from "react-router";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Home", active: location.pathname === "/", path: "/" },
    {
      icon: TrendingUp,
      label: "Trending",
      active: location.pathname === "/trending",
      path: "/trending",
    },
    {
      icon: Clock,
      label: "Watch Later",
      active: location.pathname === "/watch-later",
      path: "/watch-later",
    },
    {
      icon: Star,
      label: "Favorites",
      active: location.pathname === "/favorites",
      path: "/favorites",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col h-full fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
            AnimeList
          </h1>
          {/* Close button - only visible on mobile */}
          <button
            onClick={onClose}
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={onClose}
              className={`w-full text-lg font-semibold flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                item.active
                  ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-400 border border-purple-500/30"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
