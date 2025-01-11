export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api)
    //"/((?!api|assets|.*\\..*|_next).*)",
    "/((?!api|assets|docs|.*\\..*|_next).*)",
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    // Optional: only run on root (/) URL
  ],
}
