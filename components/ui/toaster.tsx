"use client"

import Image from "next/image"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        image,
        ...props
      }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex gap-2">
              {image && (
                <div className="relative h-10 w-auto">
                  <Image
                    alt="Toast Image"
                    className="object-fit rounded-full"
                    src={image} // Pastikan URL gambar valid
                    fill={true} // Untuk mengisi kontainer
                    sizes="48px" // Ukuran responsif
                  />
                </div>
              )}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>

            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
