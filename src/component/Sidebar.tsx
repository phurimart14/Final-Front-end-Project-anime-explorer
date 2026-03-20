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
    <aside>
      <div>
        <h1>AnimeList</h1>
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
