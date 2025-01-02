import { Suspense } from "react"
import Link from "next/link"

import { Skeleton } from "@/components/ui/skeleton"
import { SearchInput } from "@/components/search-input"
import { SiteMenu } from "@/components/site-menu"
import { SiteNav } from "@/components/site-nav"
import { SiteSettings } from "@/components/site-settings"

import { Icons } from "./icons"

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-14 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="lg:hidden">
          <SiteMenu />
        </div>
        <SiteNav />

        <div className="flex flex-1 justify-end gap-4">
          <Suspense fallback={<Skeleton className="h-10 w-60" />}>
            <SearchInput />
          </Suspense>

          <SiteSettings />
          <Link href={`/loading`} className="relative aspect-square">
            <div className="grid size-full place-items-center">
              <Icons.Profile className="size-6" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}
