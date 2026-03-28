import axios from "axios";
import type { JikanAnime, AnimeDetails } from "../types/types";
import { toast } from "sonner";

const BASE_URL = "https://api.jikan.moe/v4";

// Helper แปลง JikanAnime → Anime
export const jikanToAnime = (anime: JikanAnime): AnimeDetails => ({
  id: anime.mal_id,
  title: anime.title,
  image: anime.images.jpg.large_image_url,
  rating: anime.score,
  status:
    anime.status === "Currently Airing"
      ? "Airing"
      : anime.status === "Not yet aired"
        ? "Upcoming"
        : "Completed",
  episodes: anime.episodes ?? undefined,
  description: anime.synopsis,
  genres: anime.genres.map((g) => g.name),
  year: anime.year ?? undefined,
  studio: anime.studios?.[0]?.name,
  members: anime.members ?? 0, // ← เพิ่ม
});

// ดึง Popular This Season
export const fetchSeasonNow = async (): Promise<JikanAnime[]> => {
  const res = await axios.get(`${BASE_URL}/seasons/now?limit=24`);
  return res.data.data;
};

// ดึง Search
export const fetchSearchAnime = async (
  query: string,
): Promise<JikanAnime[]> => {
  const res = await axios.get(
    `${BASE_URL}/anime?q=${query}&limit=24&order_by=score&sort=desc`,
  );
  return res.data.data;
};

//ดึง Trending
export const fetchTrendingAnime = async (): Promise<JikanAnime[]> => {
  const res = await axios.get(`${BASE_URL}/top/anime`);
  return res.data.data;
};

// ดึง Genres
export const fetchGenres = async () => {
  const res = await axios.get(`${BASE_URL}/genres/anime`);
  return res.data.data.filter((g: { mal_id: number }) => g.mal_id <= 43);
};

//Herosection
export const handleWatchlistAction = (
  id: number,
  anime: AnimeDetails,
  checkFn: (id: number) => boolean,
  addFn: (anime: AnimeDetails) => void,
  removeFn: (id: number) => void,
  itemName: string,
) => {
  if (checkFn(id)) {
    removeFn(id);
    toast.error(`Removed "${itemName}" from favorites`);
  } else {
    addFn(anime);
    toast.success(`Added "${itemName}" to favorites`);
  }
};
