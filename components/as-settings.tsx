"use client"

import React, { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { useAdScript } from "@/lib/adScriptContext"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Define the schema for form validation
const formSchema = z.object({
  scriptSrc: z.string().min(1, { message: "Please enter a valid URL" }),
  directLink: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .optional()
    .or(z.literal("")),
  key: z.string().min(1, { message: "Key is required" }),
  format: z.string().min(1, { message: "Format is required" }).optional(),
  height: z
    .number()
    .min(1, { message: "Height must be greater than 0" })
    .optional(),
  width: z
    .number()
    .min(1, { message: "Width must be greater than 0" })
    .optional(),
  params: z
    .string()
    .refine(
      (value) => {
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
  histatId: z
    .string()
    .refine((value) => !value || !isNaN(Number(value)), {
      message: "Histat ID must be a numeric string",
    })
    .optional(),
})

const SettingPage: React.FC = () => {
  const {
    adScriptOptions,
    scriptSrc,
    directLink,
    updateAdScriptOptions,
    updateScriptSrc,
    updateDirectLink,
    saveConfig,
  } = useAdScript()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scriptSrc,
      directLink,
      key: adScriptOptions.key,
      format: adScriptOptions.format,
      height: adScriptOptions.height,
      width: adScriptOptions.width,
      params: JSON.stringify(adScriptOptions.params, null, 2),
      histatId: adScriptOptions.histatId || "",
    },
  })

  useEffect(() => {
    form.reset({
      scriptSrc,
      directLink,
      key: adScriptOptions.key,
      format: adScriptOptions.format,
      height: adScriptOptions.height,
      width: adScriptOptions.width,
      params: JSON.stringify(adScriptOptions.params, null, 2),
      histatId: adScriptOptions.histatId || "",
    })
  }, [scriptSrc, directLink, adScriptOptions, form])
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      updateScriptSrc(values.scriptSrc)
      updateDirectLink(values.directLink || "")
      updateAdScriptOptions({
        key: values.key,
        format: values.format || "",
        height: values.height || 0,
        width: values.width || 0,
        params: values.params ? JSON.parse(values.params) : {},
        histatId: values.histatId || "",
      })
      const updatedConfig = {
        scriptSrc: values.scriptSrc,
        directLink: values.directLink || "",
        key: values.key,
        format: values.format,
        height: values.height,
        width: values.width,
        params: JSON.parse(values?.params ?? "{}"),
        histatId: values.histatId || "",
      }
      await saveConfig(updatedConfig)
    } catch (error) {
      console.error("Error saving settings:", error)
    }
  }
  console.log(directLink)
  const handleReset = () => {
    form.reset({
      scriptSrc: "",
      directLink: "",
      key: "",
      format: "iframe",
      height: 50,
      width: 320,
      params: "{}",
      histatId: "",
    })
    localStorage.removeItem("adScriptSettings")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Ad Script Settings</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="scriptSrc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Script Source</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/script.js"
                    {...field}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="directLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Direct Link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/ad"
                    {...field}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="format"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Format</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="width"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Width</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="params"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Params (JSON)</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="histatId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Histat ID (optional)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <Button type="submit">Save Settings</Button>
            <Button type="button" variant="destructive" onClick={handleReset}>
              Reset to Default
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SettingPage
