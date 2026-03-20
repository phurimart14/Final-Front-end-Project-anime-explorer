import { Home, TrendingUp, Clock, Star } from "lucide-react";
import { Link, useLocation } from "react-router";

export function Sidebar() {
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
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col h-full fixed left-0 top-0 max-md:hidden">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
          AnimeList
        </h1>
      </div>
      <nav className="flex-1 px-3">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`w-full flex item-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
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
  );
}
