import Papa from "papaparse";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const filePath = path.resolve(
      "public",
      "Most_Streamed_Spotify_Songs_2024.csv"
    );

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const file = fs.readFileSync(filePath, "utf8");

    let results;
    try {
      results = Papa.parse(file, {
        header: true,
        dynamicTyping: true,
      });
      const limitedResults = results.data.slice(0, 1000);
      console.log(limitedResults);
      return NextResponse.json({ limitedResults }, { status: 200 });
    } catch (parseError: any) {
      return NextResponse.json({ error: parseError.message }, { status: 500 });
    }
  } catch (readError: any) {
    return NextResponse.json({ error: readError.message }, { status: 500 });
  }
}
