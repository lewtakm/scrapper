"use server";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { url } = await request.json();

  try {
    const response = await fetch(url);
    const html = await response.text();

    const data = {
      url,
      title: html.match(/<title>(.*?)<\/title>/i)?.[1] || "No title found",
      length: html.length,
      links: (html.match(/<a /gi) || []).length,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error scraping data:", error);
    return NextResponse.json(
      { error: "Failed to scrape data" },
      { status: 500 }
    );
  }
}
