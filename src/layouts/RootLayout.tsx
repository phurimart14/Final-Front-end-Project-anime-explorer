import { Outlet } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { SearchBar } from "../components/SearchBar";

export function RootLayout() {
  return (
    <div className="size-full bg-black text-zinc-100 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col h-full overflow-hidden">
        {/* Search Bar */}
        <SearchBar />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-black via-zinc-950 to-black">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
