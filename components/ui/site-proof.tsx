"use client"

import React, { useEffect } from "react"
// Hook toast untuk notifikasi
import Link from "next/link"

import { useToast } from "@/components/ui/use-toast"

import { Icons } from "../icons"

// Sesuaikan path dengan implementasi TMDB API Anda

const getRandomElement = (array: any[]) =>
  array[Math.floor(Math.random() * array.length)]

interface ProofProps {
  combined: any[]
}

export const SiteProof: React.FC<ProofProps> = ({ combined }) => {
  const { toast } = useToast()

  useEffect(() => {
    const fetchDataAndShowToast = async () => {
      try {
        // Panggil API randomuser.me untuk mendapatkan informasi negara
        const userResponse = await fetch("https://randomuser.me/api/")
        const userData = await userResponse.json()
        const country = userData?.results?.[0]?.location?.country || "Unknown"
        const user = userData?.results?.[0]?.name?.last || "Unknown"
        const image = userData?.results?.[0]?.picture.medium || "Unknown"

        if (combined.length > 0) {
          // Pilih judul film/serial secara acak
          const randomItem = getRandomElement(combined)
          const randomTitle =
            randomItem?.title || randomItem?.name || "Unknown Title"
          // Tampilkan toast
          toast({
            variant: "proof",
            title: `${user} from ${country}`,
            description: `Now Watching "${randomTitle}" Recently signed up`,
            image: image,
            action: (
              <Link href={`/loading`} className="relative aspect-square">
                <div className="grid size-full place-items-center">
                  <Icons.Profile className="size-6" />
                </div>
              </Link>
            ),
          })
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchDataAndShowToast()
    const interval = setInterval(fetchDataAndShowToast, 30 * 1000)

    return () => clearInterval(interval)
  }, [toast])

  return null
}
