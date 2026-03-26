import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Trending } from "./pages/Trending";
import { WatchLater } from "./pages/WatchLater";
import { Favorite } from "./pages/Favorites";
import { RootLayout } from "./layouts/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "trending", element: <Trending /> },
      { path: "watch-later", element: <WatchLater /> },
      { path: "favorites", element: <Favorite /> },
    ],
  },
]);
