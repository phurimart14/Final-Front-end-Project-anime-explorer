import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Trending } from "./pages/Trending";
import { WatchLater } from "./pages/WatchLater";
import { Favorite } from "./pages/Favorites";
import { RootLayout } from "./layouts/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "trending", Component: Trending },
      { path: "watch-later", Component: WatchLater },
      { path: "favorites", Component: Favorite },
    ],
  },
]);
