import { pages } from "@/config"

import { TVList } from "@/components/tv-list"

interface ListPageProps {
  searchParams?: Record<string, string>
}

export async function generateMetadata() {
  return {
    title: "Top Rated TV Shows",
    description: pages.tv.topRated.description,
  }
}

export default async function TopRated({ searchParams }: ListPageProps) {
  return (
    <TVList
      list="top_rated"
      page={searchParams?.page ?? "1"}
      title={pages.tv.topRated.title}
      description={pages.tv.topRated.description}
    />
  )
}
