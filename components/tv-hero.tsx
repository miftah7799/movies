"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { TvShow } from "@/tmdb/models"
import { ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { MediaBackdrop } from "@/components/media-backdrop"

interface TvHeroProps {
  tvShow: TvShow
  label: string
  count?: number
}

export const TvHero: React.FC<TvHeroProps> = ({ tvShow, label, count = 1 }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <Skeleton className="h-hero relative w-full" />

  return (
    <div className="h-hero relative" key={tvShow.id}>
      <MediaBackdrop image={tvShow.backdrop_path} alt={tvShow.name} />

      <div className="overlay">
        <div className="mx-auto max-w-3xl space-y-4 p-4 pb-8 text-center md:p-14">
          <Badge className="select-none">{label}</Badge>

          <h1 className="line-clamp-2 text-xl font-medium leading-tight tracking-tighter md:text-4xl">
            {tvShow.name}
          </h1>
          <p className="line-clamp-3 text-sm text-muted-foreground md:text-lg">
            {tvShow.overview}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <Link
              href={`/tv/${tvShow.id}`}
              className={buttonVariants({
                size: "lg",
                variant: "default",
              })}
            >
              Details <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
