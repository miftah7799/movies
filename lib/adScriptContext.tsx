"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

export interface AdScriptConfig {
  scriptSrc: string
  key: string
  directLink: string
  format: string
  height: number
  width: number
  params: Record<string, unknown>
}

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
  reloadConfig: () => Promise<void>
  saveConfig: (newConfig: Partial<AdScriptConfig>) => Promise<void>
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

export const useAdScript = () => {
  const context = useContext(AdScriptContext)
  if (context === undefined) {
    throw new Error("useAdScript must be used within an AdScriptProvider")
  }
  return context
}

export const AdScriptProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [adScriptOptions, setAdScriptOptions] = useState<AdScriptOptions>(
    defaultAdScriptOptions
  )
  const [scriptSrc, setScriptSrc] = useState<string>("")
  const [directLink, setDirectLink] = useState<string>("")

  const reloadConfig = async () => {
    try {
      const response = await fetch("/api/adconfig")
      const data: AdScriptConfig = await response.json()
      setAdScriptOptions({
        key: data.key,
        format: data.format,
        height: data.height,
        width: data.width,
        params: data.params,
      })
      setScriptSrc(data.scriptSrc)
      setDirectLink(data.directLink)
      console.log("Config succesfully loaded")
    } catch (error) {
      console.error("Failed to load ad config:", error)
    }
  }

  const saveConfig = async (newConfig: Partial<AdScriptConfig>) => {
    try {
      const response = await fetch("/api/adconfig", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig),
      })

      if (!response.ok) {
        throw new Error("Failed to save ad config")
      }
      console.log("Config succesfully updated")
    } catch (error) {
      console.error("Failed to save ad config:", error)
    }
  }

  useEffect(() => {
    reloadConfig()
  }, [])

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
        reloadConfig,
        saveConfig,
      }}
    >
      {children}
    </AdScriptContext.Provider>
  )
}
