import React from "react"
import { Metadata } from "next"

import SettingPage from "@/components/as-settings"

export const metadata: Metadata = {
  title: "Ad Config",
}

export default function Config() {
  return <SettingPage />
}
