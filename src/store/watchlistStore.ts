import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AnimeDetails } from "../types/types";

interface WatchlistState {
  favorites: AnimeDetails[];
  watchLater: AnimeDetails[];
  addFavorite: (anime: AnimeDetails) => void;
  removeFavorite: (id: number) => void;
  addWatchLater: (anime: AnimeDetails) => void;
  removeWatchLater: (id: number) => void;
  isFavorite: (id: number) => boolean;
  isWatchLater: (id: number) => boolean;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      favorites: [],
      watchLater: [],

      addFavorite: (anime) =>
        set((state) => {
          if (state.favorites.find((a) => a.id === anime.id)) return state;
          return { favorites: [...state.favorites, anime] };
        }),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((a) => a.id !== id),
        })),

      addWatchLater: (anime) =>
        set((state) => {
          if (state.watchLater.find((a) => a.id === anime.id)) return state;
          return { watchLater: [...state.watchLater, anime] };
        }),

      removeWatchLater: (id) =>
        set((state) => ({
          watchLater: state.watchLater.filter((a) => a.id !== id),
        })),

      isFavorite: (id) => get().favorites.some((a) => a.id === id),
      isWatchLater: (id) => get().watchLater.some((a) => a.id === id),
    }),
    {
      name: "watchlist", // ← ชื่อ key ใน localStorage
    }
  )
);