"use client"

import React, { useEffect, useRef } from "react"

const AdScript: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Kode untuk menginisialisasi script
    const atOptions = {
      key: "f5a73ef3091d38301304ffb006681213",
      format: "iframe",
      height: 50,
      width: 320,
      params: {},
    }
    ;(window as any).atOptions = atOptions
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      const script = document.createElement("script")
      script.src =
        "//conceivesaucerfalcon.com/f5a73ef3091d38301304ffb006681213/invoke.js"
      script.async = true
      containerRef.current.appendChild(script)
    }
  }, [])

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
