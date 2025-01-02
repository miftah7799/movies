import { Metadata } from "next"
import Link from "next/link"
import { tmdb } from "@/tmdb/api"

import { MovieHero } from "@/components/movie-hero"
import { TvHero } from "@/components/tv-hero"

import { MovieCard } from "../../components/movie-card"
import { TvCard } from "../../components/tv-card"
import { buttonVariants } from "../../components/ui/button"
import { cn } from "../../lib/utils"

export const metadata: Metadata = {
  title: "Home",
}

export default async function Home() {
  const { results: movies } = await tmdb.trending.movie({
    time: "day",
    page: "1",
  })

  const { results: tvShows } = await tmdb.trending.tv({
    time: "day",
    page: "1",
  })

  return (
    <section>
      <div className="container space-y-8">
        <MovieHero movies={movies} label="Trending Now" />

        <div className="flex flex-row justify-end">
          <Link
            href={"/trending/movie"}
            className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
            prefetch={false}
          >
            Explore more
          </Link>
        </div>

        {movies.length ? (
          <div className="grid-list">
            {movies.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        ) : (
          <div className="container flex justify-center pb-[30dvh]">
            <div className="text-center">
              <h1 className="text-2xl">
                No movies found for the selected filters.
              </h1>
              <p className="text-muted-foreground">
                Try removing some of the filters to get more results.
              </p>
            </div>
          </div>
        )}
        <TvHero tvShows={tvShows.slice(10, 20)} label="Trending Now" />
        <div className="flex flex-row justify-end">
          <Link
            href={"/trending/tv"}
            className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
            prefetch={false}
          >
            Explore more
          </Link>
        </div>

        {tvShows.length ? (
          <div className="grid-list">
            {tvShows.map((tv) => (
              <TvCard key={tv.id} {...tv} />
            ))}
          </div>
        ) : (
          <div className="container flex justify-center pb-[30dvh]">
            <div className="text-center">
              <h1 className="text-2xl">
                No TV Shows found for the selected filters.
              </h1>
              <p className="text-muted-foreground">
                Try removing some of the filters to get more results.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
