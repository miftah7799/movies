"use server"

import fs from "fs/promises"
import path from "path"
import { z } from "zod"

const formSchema = z.object({
  scriptSrc: z.string(),
  key: z.string().min(1),
  directLink: z.string().url().optional().or(z.literal("")),
  format: z.string().optional(),
  height: z.number().min(1).optional(),
  width: z.number().min(1).optional(),
  params: z
    .string()
    .refine(
      (value) => {
        if (!value) return true
        try {
          JSON.parse(value)
          return true
        } catch {
          return false
        }
      },
      { message: "Invalid JSON for params" }
    )
    .optional(),
})

export async function saveSettings(data: z.infer<typeof formSchema>) {
  const result = formSchema.safeParse(data)

  if (!result.success) {
    throw new Error("Invalid form data")
  }

  const settingsPath = path.join(process.cwd(), "ad-settings.json")
  console.log(settingsPath)
  try {
    await fs.writeFile(settingsPath, JSON.stringify(result.data, null, 2))
  } catch (error) {
    console.error("Error writing settings file:", error)
    throw new Error("Failed to save settings")
  }
}
