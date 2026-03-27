import { Outlet, useLocation } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { SearchBar } from "../components/SearchBar";
import { useState } from "react";
import { Toaster } from "sonner";
import { useWatchlist } from "../hooks/useWatchlist";

export function RootLayout() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGenres, setFilterGenres] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const hideSearchPaths = ["/trending", "/favorites", "/watch-later"];
  const shouldShowSearch = !hideSearchPaths.includes(location.pathname);
  const watchlist = useWatchlist();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="size-full bg-black text-zinc-100 flex overflow-hidden">
      {/* Sidebar */}
      <Toaster position="bottom-right" richColors />
      <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col h-full overflow-hidden">
        {/* Search Bar */}
        {/* ใส่เงื่อนไขครอบ SearchBar ไว้ */}
        {shouldShowSearch && (
          <SearchBar
            onSearch={setSearchQuery}
            onFilter={setFilterGenres}
            onMenuClick={toggleMobileMenu}
          />
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-black via-zinc-950 to-black">
          <Outlet context={{ searchQuery, filterGenres, ...watchlist }} />
        </main>
      </div>
    </div>
  );
}
