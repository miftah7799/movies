import React from "react"

import { Icons } from "../../../components/icons"

export default async function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Icons.spinner className="mr-2 size-24 animate-spin" />
    </div>
  )
}
