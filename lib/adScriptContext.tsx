"use client"

import React, { createContext, useContext, useState } from "react"

export interface AdScriptOptions {
  key: string
  format: string
  height: number
  width: number
  params: Record<string, unknown>
}

export interface AdScriptContextType {
  adScriptOptions: AdScriptOptions
  scriptSrc: string
  directLink: string
  updateAdScriptOptions: (newOptions: Partial<AdScriptOptions>) => void
  updateScriptSrc: (newSrc: string) => void
  updateDirectLink: (newLink: string) => void
}

const defaultAdScriptOptions: AdScriptOptions = {
  key: "",
  format: "iframe",
  height: 50,
  width: 320,
  params: {},
}

const AdScriptContext = createContext<AdScriptContextType | undefined>(
  undefined
)

export const AdScriptProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [adScriptOptions, setAdScriptOptions] = useState<AdScriptOptions>(
    defaultAdScriptOptions
  )
  const [scriptSrc, setScriptSrc] = useState<string>("")
  const [directLink, setDirectLink] = useState<string>("")

  const updateAdScriptOptions = (newOptions: Partial<AdScriptOptions>) => {
    setAdScriptOptions((prevOptions) => ({ ...prevOptions, ...newOptions }))
  }

  const updateScriptSrc = (newSrc: string) => {
    setScriptSrc(newSrc)
  }

  const updateDirectLink = (newLink: string) => {
    setDirectLink(newLink)
  }

  return (
    <AdScriptContext.Provider
      value={{
        adScriptOptions,
        scriptSrc,
        directLink,
        updateAdScriptOptions,
        updateScriptSrc,
        updateDirectLink,
      }}
    >
      {children}
    </AdScriptContext.Provider>
  )
}

export const useAdScript = () => {
  const context = useContext(AdScriptContext)
  if (context === undefined) {
    throw new Error("useAdScript must be used within an AdScriptProvider")
  }
  return context
}
