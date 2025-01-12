"use client"

import React, { useEffect, useRef } from "react"

import { useAdScript } from "@/lib/adScriptContext"

interface AdScriptProps {
  className?: string
}
const AdScript: React.FC<AdScriptProps> = ({ className = "ad-container" }) => {
  const { adScriptOptions, scriptSrc, directLink } = useAdScript()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set global options
    ;(window as any).atOptions = adScriptOptions

    // Create and append script
    if (containerRef.current && scriptSrc) {
      const script = document.createElement("script")
      script.src = scriptSrc
      script.async = true
      containerRef.current.appendChild(script)
    }

    // Cleanup function
    return () => {
      if (containerRef.current) {
        const script = containerRef.current.querySelector("script")
        if (script) {
          containerRef.current.removeChild(script)
        }
      }
    }
  }, [scriptSrc, adScriptOptions])

  return (
    <>
      <div
        ref={containerRef}
        className="ad-container flex h-full items-center justify-center"
      ></div>
    </>
  )
}

export default AdScript
