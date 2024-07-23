import { BrowserFactory } from "@/services/scrap/BrowserFactory";
import * as cheerio from "cheerio";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const endpoint = "https://vjudge.net/contest/591336#rank";

  const browser = await BrowserFactory.getBrowser();
  const page = await browser.newPage();

  await page.goto(endpoint);
  await page.waitForNetworkIdle();
  await page.screenshot({ path: "example.png" });

  const html = await page.content();
  const $ = cheerio.load(html);

  const $table = $("#contest-rank-table tbody tr");
  const standings: ContestStanding[] = [];
  $table.each((i, tr) => {
    const $tr = $(tr);
    const $td = $tr.find("td");

    const standing = {
      contest_id: "",
      id: randomUUID(),
      rank: Number($td.eq(0).text().trim()),
      university: "",
      team: $td.eq(1).text().trim(),
      problems_solved: Number($td.eq(2).text().trim()),
      total_time: Number($td.eq(3).text().trim()),
      problems_stats: {},
    };
    standings.push(standing);
  });

  await browser.close();
  return NextResponse.json(standings);
}
