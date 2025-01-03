"use client"

import React from "react"

import { useWindowDimensions } from "../hooks"

export const WindowDimension = () => {
  // const [width, setWidth] = useState(window.innerWidth);
  // const [height, setHeight] = useState(window.innerHeight);

  // useEffect(() => {
  //   const handleResize = () => setWidth(window.innerWidth);
  //   const handleHidth = () => setWidth(window.innerHeight);
  //   window.addEventListener("resize", handleResize);
  //   window.addEventListener("resize", handleHidth);
  //   return () => {
  //     window.removeEventListener("resize", handleResize)
  //     window.removeEventListener("resize", handleHidth)
  //   }
  // }, []);

  const { width, height } = useWindowDimensions()

  return (
    <div>
      {" "}
      <p>
        The width of the screen is: {width}px with {height}px{" "}
      </p>{" "}
    </div>
  )
}
