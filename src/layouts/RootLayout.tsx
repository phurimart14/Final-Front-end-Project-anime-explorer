import { Outlet } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { SearchBar } from "../components/SearchBar";
import { useState } from "react";

export function RootLayout() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGenres, setFilterGenres] = useState<string[]>([]);

  return (
    <div className="size-full bg-black text-zinc-100 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col h-full overflow-hidden">
        {/* Search Bar */}
        <SearchBar onSearch={setSearchQuery} onFilter={setFilterGenres}/>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-black via-zinc-950 to-black">
          <Outlet context={{ searchQuery, filterGenres }} />
        </main>
      </div>
    </div>
  );
}
