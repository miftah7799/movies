import { NextRequest, NextResponse } from "next/server"

let config = {
  scriptSrc: process.env.NEXT_PUBLIC_SCRIPT_SRC || "",
  key: process.env.NEXT_PUBLIC_KEY || "",
  directLink: process.env.NEXT_PUBLIC_DIRECT_LINK || "",
  format: process.env.NEXT_PUBLIC_FORMAT || "iframe",
  height: Number(process.env.NEXT_PUBLIC_HEIGHT) || 50,
  width: Number(process.env.NEXT_PUBLIC_WIDTH) || 320,
  params: process.env.NEXT_PUBLIC_PARAMS
    ? JSON.parse(process.env.NEXT_PUBLIC_PARAMS)
    : {},
}

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    return NextResponse.json(config)
  } catch (error) {
    return NextResponse.json({
      status: "fail",
      message: "Something went wrong",
      data: error,
    })
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    let reqBody = await request.json()
    config = { ...config, ...reqBody }

    return NextResponse.json(config)
  } catch (error) {
    return NextResponse.json({
      status: "fail",
      message: "Something went wrong",
      data: error,
    })
  }
}
