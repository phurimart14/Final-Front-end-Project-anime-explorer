import { Outlet } from "react-router-dom";
import { Sidebar } from "../component/Sidebar.tsx";
import { SearchBar } from "../component/SearchBar.tsx";

export function RootLayout() {
  return (
    <div className="flex size-full bg-black text-zinc-100 overflow-hidden">
      {/*SideBar*/}
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
