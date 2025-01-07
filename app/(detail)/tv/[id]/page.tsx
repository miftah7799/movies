import Link from "next/link"
import { tmdb } from "@/tmdb/api"
import { format } from "@/tmdb/utils"

import { cn, formatValue, joiner, pad } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { MediaBackdrop } from "@/components/media-backdrop"
import { TvCard } from "@/components/tv-card"

export default async function Detail({ params }: { params: { id: string } }) {
  const {
    first_air_date,
    last_air_date,
    status,
    original_name,
    created_by,
    number_of_seasons,
    number_of_episodes,
    spoken_languages,
    production_companies,
    networks,
    last_episode_to_air: lastEpisode,
  } = await tmdb.tv.detail({
    id: params.id,
  })

  const { results: recommends } = await tmdb.tv.recommendations({
    id: params.id,
    page: "1",
  })

  const items = [
    {
      title: "Created By",
      value: created_by.map(({ id, name }) => (
        <Link
          key={id}
          href={`/person/${id}`}
          className="mr-1 border-b-2 transition hover:text-foreground"
        >
          {name}
        </Link>
      )),
    },
    {
      title: "Status",
      value: formatValue(status),
    },
    {
      title: "Original Name",
      value: formatValue(original_name),
    },
    {
      title: "First Air Date",
      value: formatValue(first_air_date, format.date),
    },
    {
      title: "Last Air Date",
      value: formatValue(last_air_date, format.date),
    },
    {
      title: "Seasons",
      value: formatValue(number_of_seasons),
    },
    {
      title: "Episodes",
      value: formatValue(number_of_episodes),
    },
    {
      title: "Language",
      value: joiner(spoken_languages, "english_name"),
    },
    {
      title: "Production Companies",
      value: production_companies.map(({ id, name }) => (
        <Link
          key={id}
          href={`/tv/discover?with_companies=${id}`}
          className="mr-1 border-b-2 transition hover:text-foreground"
        >
          {name}
        </Link>
      )),
    },
    {
      title: "Networks",
      value: networks.map(({ id, name }) => (
        <Link
          key={id}
          href={`/tv/discover?with_networks=${id}`}
          className="mr-1 border-b-2 transition hover:text-foreground"
        >
          {name}
        </Link>
      )),
    },
  ]

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-2 gap-y-12 rounded border p-6 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.title}>
            <h2 className="font-medium md:text-xl">{item.title}</h2>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground md:text-base">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {lastEpisode && (
        <div className="h-hero relative w-full">
          <MediaBackdrop
            image={lastEpisode.still_path}
            alt={lastEpisode.name}
          />
          <div className="overlay">
            <div className="p-4 md:p-10">
              <Badge className="mb-4 gap-1">
                <span>S{pad(lastEpisode.season_number)}</span>
                <span>E{pad(lastEpisode.episode_number)}</span>
              </Badge>

              <h2 className="line-clamp-1 text-lg font-medium md:text-2xl">
                {lastEpisode.name}
              </h2>
              <p className="line-clamp-3 max-w-xl text-muted-foreground md:line-clamp-6">
                {lastEpisode.overview}
              </p>
              <Link
                href={`/tv/${params.id}/seasons?s=${lastEpisode.season_number}`}
                className={cn(buttonVariants({ variant: "default" }), "mt-4")}
                prefetch={false}
              >
                View Episodes
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-row justify-between">
        <h1 className="line-clamp-2 text-xl font-medium leading-tight tracking-tighter md:text-2xl">
          Recomendations
        </h1>
        <Link
          href={"/trending/tv"}
          className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
          prefetch={false}
        >
          Explore more
        </Link>
      </div>

      {recommends.length ? (
        <div className="grid-list">
          {recommends.map((tv) => (
            <TvCard key={tv.id} {...tv} />
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
    </section>
  )
}
