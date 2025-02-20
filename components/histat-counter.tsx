/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

import { useAdScript } from "@/lib/adScriptContext"

const Histats = () => {
  const { siteId } = useAdScript()
  const pathname = usePathname()
  useEffect(() => {
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.innerHTML = `
      var _Hasync= _Hasync|| [];
      _Hasync.push(['Histats.start', '1,${siteId},4,0,0,0,00010000']);
      _Hasync.push(['Histats.fasi', '1']);
      _Hasync.push(['Histats.track_hits', '']);
      (function() {
        var hs = document.createElement('script'); hs.type = 'text/javascript'; hs.async = true;
        hs.src = ('//s10.histats.com/js15_as.js');
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
      })();
    `
    document.body.appendChild(script)

    const noscript = document.createElement("noscript")
    noscript.innerHTML = `
      <a href="/" target="_blank">
        <img src="//sstatic1.histats.com/0.gif?${siteId}&101" alt="" border="0">
      </a>
    `
    document.body.appendChild(noscript)

    return () => {
      document.body.removeChild(script)
      document.body.removeChild(noscript)
    }
  }, [pathname])

  return <div />
}

export default Histats
