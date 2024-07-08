import Link from "next/link"
import { tmdb } from "@/tmdb/api"

import { MediaCard } from "@/components/media-card"
import { PosterImage } from "@/components/poster-image"

interface DetailSimilarProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: DetailSimilarProps) {
  const { title } = await tmdb.movie.detail({
    id: params.id,
  })

  return {
    title: `Similar - ${title}`,
  }
}

export default async function DetailSimilar({ params }: DetailSimilarProps) {
  const { results } = await tmdb.movie.similar({
    id: params.id,
  })

  if (!results.length) {
    return <div className="empty-box">No recommendations</div>
  }

  return (
    <ul className="grid-list">
      {results.map((movie) => (
        <Link href={`/movie/${movie.id}`} key={movie.id}>
          <MediaCard.Root>
            <PosterImage
              image={movie.poster_path}
              size="w500"
              alt={movie.title}
            />
            <MediaCard.Content>
              <MediaCard.Title>{movie.title}</MediaCard.Title>
              <MediaCard.Excerpt>{movie.overview}</MediaCard.Excerpt>
            </MediaCard.Content>
          </MediaCard.Root>
        </Link>
      ))}
    </ul>
  )
}
