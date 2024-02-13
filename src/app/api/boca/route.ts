import { BrowserFactory } from "@/lib/scrap/BrowserFactory";
import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   const ENV_URL = "https://redprogramacioncompetitiva.com/contests/2023/13/";

//   const browser = await BrowserFactory.getBrowser();

//   const page = await browser.newPage();
//   await page.goto(ENV_URL);
//   await page.waitForSelector("input");

//   await page.evaluate(() => {
//     const inputs = document.getElementsByTagName("input");
//     const userNameInput = inputs[0];
//     const passwordInput = inputs[1];
//     const submitButton = inputs[2];

//     userNameInput.value = "";
//     passwordInput.value = "";

//     submitButton.click();
//   });

//   const problemsButton = await page.waitForSelector(
//     "body > table:nth-child(2) > tbody > tr > td:nth-child(1) > a"
//   );
//   await problemsButton?.click();
//   await page.waitForNavigation();

//   const problemsHtml = await page.content();
//   const $problemsPage = cheerio.load(problemsHtml);
//   const $problemsTable = $problemsPage(
//     "body > table:nth-child(4) > tbody > tr"
//   );

//   const problems: Problem[] = [];
//   $problemsTable.each((i, tr) => {
//     const $tr = $problemsPage(tr);
//     if (i === 0) return;
//     const $td = $tr.find("td");

//     const problem = {
//       indicative: $td.eq(0).text().trim(),
//       id: $td.eq(1).text().trim(),
//       problem_name: $td.eq(2).text().trim(),
//       origin: "RCP",
//       memory_limit: -1,
//       time_limit: -1,
//     };
//     problems.push(problem);
//   });

//   const scoreButton = await page.waitForSelector(
//     "body > table:nth-child(2) > tbody > tr > td:nth-child(3) > a"
//   );
//   await scoreButton?.click();
//   await page.waitForNavigation();

//   const scoreHtml = await page.content();
//   const $scorePage = cheerio.load(scoreHtml);
//   const $scoreTable = $scorePage("#myscoretable tbody tr");

//   const submissions: Submission[] = [];
//   $scoreTable.each((i, tr) => {
//     const $tr = $scorePage(tr);
//     if (i === 0) return;
//     const $td = $tr.find("td");

//     const user_name = $td.eq(1).text().trim();
//     const university = $td.eq(2).text().trim();
//     const rank = $td.eq(0).text().trim();

//     const submission = {
//       code_length: -1,
//       contest_id: "2023-13",
//       id: -1,
//       user_name: $td.eq(1).text().trim(),
//       language: "",
//       memory_consumed: -1,
//       problem_name: "",
//       result: $td.eq(3).text().trim(),
//       submission_date: "",
//       time_consumed: -1,
//     };
//     submissions.push(submission);
//   });

//   await browser.close();
//   return NextResponse.json({ problems, submissions });
// }
