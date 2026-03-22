import { X, Star, Play, Heart, Clock, Calendar, Tv, Users, Tag } from 'lucide-react';
import { useState } from 'react';

interface AnimeDetailModalProps {
  anime: AnimeDetails;
  onClose: () => void;
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
}

export function AnimeDetailModal({ anime, onClose }: AnimeDetailModalProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  const statusColors = {
    Airing: "bg-green-500/20 text-green-400 border-green-500/30",
    Completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    Upcoming: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };

  return (
    <>
    {/* Overlay */}
     <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={onClose}
      />
      {/* Modal */}
      
    </>
  )
}
