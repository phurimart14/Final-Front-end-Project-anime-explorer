import { useState, useEffect } from "react";
import type { AnimeDetails } from "../types/types";

export function useWatchlist() {
  const [favorites, setFavorites] = useState<AnimeDetails[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [watchLater, setWatchLater] = useState<AnimeDetails[]>(() => {
    const saved = localStorage.getItem("watchLater");
    return saved ? JSON.parse(saved) : [];
  });

  // บันทึกลง localStorage ทุกครั้งที่ favorites เปลี่ยน
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // บันทึกลง localStorage ทุกครั้งที่ watchLater เปลี่ยน
  useEffect(() => {
    localStorage.setItem("watchLater", JSON.stringify(watchLater));
  }, [watchLater]);

  const addFavorite = (anime: AnimeDetails) => {
    setFavorites((prev) => {
      if (prev.find((a) => a.id === anime.id)) return prev; // มีแล้วไม่เพิ่ม
      return [...prev, anime];
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((a) => a.id !== id));
  };

  const addWatchLater = (anime: AnimeDetails) => {
    setWatchLater((prev) => {
      if (prev.find((a) => a.id === anime.id)) return prev;
      return [...prev, anime];
    });
  };

  const removeWatchLater = (id: number) => {
    setWatchLater((prev) => prev.filter((a) => a.id !== id));
  };

  const isFavorite = (id: number) => favorites.some((a) => a.id === id);
  const isWatchLater = (id: number) => watchLater.some((a) => a.id === id);

  return {
    favorites,
    watchLater,
    addFavorite,
    removeFavorite,
    addWatchLater,
    removeWatchLater,
    isFavorite,
    isWatchLater,
  };
}
