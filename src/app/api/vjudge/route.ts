import chromium from "@sparticuz/chromium";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";

export async function GET(request: NextRequest) {
  const urlParams = request.nextUrl.searchParams;
  let contestUrl = urlParams.get("contest") ?? "";
  const contestId = isValidContest(contestUrl);
  if (contestId == "") {
    return NextResponse.json(
      { data: [], error: ["Invalid contest url"] },
      { status: 400 }
    );
  }

  const chromiumPath =
    process.env.APP_ENV === "local"
      ? process.env.CHROMIUM_PATH
      : await chromium.executablePath();

  const browser = await puppeteer.launch({
    args: ["--disable-features=site-per-process"],
    defaultViewport: chromium.defaultViewport,
    executablePath: chromiumPath,
    headless: chromium.headless,
  });
  // contestUrl = contestUrl.concat("#status");
  const page = await browser.newPage();
  await page.goto(contestUrl);

  await page.setViewport({ width: 1280, height: 720 });

  let errors: Array<string> = [];
  let submissions: Array<Submission> = [];
  while (true) {
    try {
      await page.waitForNetworkIdle();
      const data = await page.evaluate(scrapTable, contestId);
      if (data.length === 0) {
        break;
      }
      submissions.push(...data);
      const button = await page.waitForSelector("#listStatus_next > a");
      await button?.click();
    } catch (e: any) {
      errors.push(e?.name);
      break;
    }
  }
  if (submissions.length === 0) {
    errors.push("No matching records found");
  }

  const target = `./contest-${contestId}.png`;
  const buffer = await page.screenshot({ path: target });
  const imageBase64 = buffer.toString("base64");
  // await fs.rm(target);

  await browser.close();
  return NextResponse.json(
    { data: submissions, error: errors, screenshot: imageBase64 },
    {
      status: errors.length > 0 ? 500 : 200,
    }
  );
}

function isValidContest(url: string): string {
  const regex = /(https:\/\/vjudge.net\/contest\/)(\d+)/gim;
  const matches = regex.exec(url);
  if (matches === null) {
    return "";
  }
  return matches[2];
}

function scrapTable(contestId: string): Array<Submission> {
  const table = document.getElementById("listStatus");
  table!.classList.add("hover-date");

  const emptySection = "No matching records found";
  if (table?.querySelector("td")?.innerText === emptySection) {
    return [];
  }

  const data: Array<any> = [];
  table?.querySelectorAll("tr").forEach((row) => {
    const rowData: Array<any> = [];
    row.querySelectorAll("td").forEach((col) => {
      rowData.push(col.innerText);
    });
    if (rowData[0] == null) {
      return;
    }
    const submission: Submission = {
      contest_id: contestId,
      id: Number(rowData[0]),
      user_name: rowData[1],
      problem_name: rowData[2],
      result: rowData[3],
      time_consumed: rowData[4] != "" ? Number(rowData[4]) : -1,
      memory_consumed: rowData[5] != "" ? Number(rowData[5]) : -1,
      code_length: Number(rowData[6]),
      language: rowData[7],
      submission_date: rowData[8],
    };
    data.push(submission);
  });
  return data;
}
