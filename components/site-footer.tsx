import { ComponentProps } from "react"
import Link from "next/link"
import { navigation } from "@/config"


export const SiteFooter: React.FC<ComponentProps<"footer">> = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-12 border-t bg-background">
      <div className="container flex flex-col lg:flex-row">
        <div className="px-2 py-8 pt-12 text-muted-foreground md:p-12">
          <Link href="/" className="text-2xl font-bold text-white">
            PopFlix
          </Link>
        </div>
        <div className="flex-1 p-12 px-2 py-8 md:p-12">
          <div className="mb-24 hidden md:flex">
            {navigation.items.slice(1, navigation.items.length).map((item) => (
              <ul className="flex-1" key={item.title}>
                <p className="mb-4 text-muted-foreground">{item.title}</p>
                {item.items?.map((subitem) => (
                  <li className="mb-2 text-sm" key={subitem.href}>
                    <Link href={subitem.href} prefetch={false}>
                      {subitem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
