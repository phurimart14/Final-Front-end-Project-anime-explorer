export interface JikanAnime {
  mal_id: number;
  title: string;
  synopsis: string;
  score: number;
  year: number | null;
  episodes: number | null;
  status: string;
  genres: { mal_id: number; name: string }[];
  images: { jpg: { large_image_url: string } };
  aired: { prop: { from: { year: number | null } } };
  studios: { name: string }[];
  members: number;
}

export interface AnimeDetails {
  id: number;
  title: string;
  image: string;
  rating: number;
  status: "Airing" | "Completed" | "Upcoming";
  episodes?: number;
  description?: string;
  genres?: string[];
  year?: number;
  studio?: string;
  members?: number;
}


export interface AnimeGridProps {
  searchQuery: string;
  filterGenres: string[];
}