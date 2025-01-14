import React from "react"
import { tmdb } from "@/tmdb/api"

// Sesuaikan path dengan implementasi TMDB API Anda
import { SiteProof } from "./ui/site-proof"

export const Proof: React.FC = async () => {
  const [moviesResponse, tvResponse] = await Promise.all([
    tmdb.trending.movie({
      time: "week",
      page: "1",
    }),
    tmdb.trending.tv({
      time: "week",
      page: "1",
    }),
  ])

  const movies = moviesResponse?.results || []
  const tvShows = tvResponse?.results || []
  const combined = [...movies, ...tvShows] // Gabungkan hasil film dan serial

  return <SiteProof combined={combined} />
}
