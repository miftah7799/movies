"use client"

import React, { useEffect, useState } from "react"
import { MovieWithMediaType, TvShowWithMediaType } from "@/tmdb/models"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import { MovieHero } from "./movie-hero"
import { TvHero } from "./tv-hero"

interface TrendCarouselProps {
  items: MovieWithMediaType[] | TvShowWithMediaType[]
  type: "movie" | "tv"
}

export const HeroCarousel: React.FC<TrendCarouselProps> = ({ items }) => {
  const [api, setApi] = useState<CarouselApi>()
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    setTotal(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="mx-auto w-full">
      <Carousel
        opts={{ loop: true, align: "center" }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        setApi={setApi}
      >
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={item.id}>
              {item.media_type !== "movie" ? (
                <TvHero tvShow={item} label="Trending Now" />
              ) : (
                <MovieHero movie={item} label="Trending Now" />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
