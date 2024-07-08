import { pages } from "@/config"

import { TrendList } from "@/components/trend-list"

interface TrendingPageProps {
  searchParams?: Record<string, string>
}

export async function generateMetadata() {
  return {
    title: "Trending TV Shows",
    description: pages.trending.tv.description,
  }
}

export default async function TrendingPage({
  searchParams,
}: TrendingPageProps) {
  return (
    <TrendList
      type="tv"
      time="day"
      page={searchParams?.page ?? "1"}
      title={pages.trending.tv.title}
      description={pages.trending.tv.description}
    />
  )
}
