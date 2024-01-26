"use server";

import * as cheerio from "cheerio";

export async function getData(contestUrl: string) {
  const response = await fetch(contestUrl);
  const html = await response.text();
  const $ = cheerio.load(html);

  const rawText = $('textarea[name="dataJson"]').text() || "";
  const data = JSON.parse(rawText);

  const contest: Contest = {
    id: data.id,
    contest_name: data.title,
    platform: "Vjudge",
    start_date: new Date(data.begin),
    end_date: new Date(data.end),
    manager: data.managerName,
    registered_participants: 0,
    source: contestUrl,
    extracted_at: new Date(),
  };

  const problems: Array<Problem> = data.problems.map((problem: any) => ({
    id: contest.id + problem.num,
    problem_name: problem.title,
    origin: problem.oj,
    time_limit: problem.properties[0].content,
    memory_limit: problem.properties[1].content,
  }));

  let start = 0;
  const paginationSize = 20;
  const statusEndpoint = new URL("https://vjudge.net/status/data");
  statusEndpoint.searchParams.set("start", start.toString());
  statusEndpoint.searchParams.set("length", paginationSize.toString());
  statusEndpoint.searchParams.set("contestId", contest.id.toString());
  statusEndpoint.searchParams.set("inContest", "true");

  const submissions: any[] = [];
  while (true) {
    try {
      const response = await fetch(statusEndpoint);
      const json = await response.json();
      const data: Array<any> = json.data;
      if (data.length === 0) {
        break;
      }
      submissions.push(...data);
      start += 20;
      statusEndpoint.searchParams.set("start", start.toString());
    } catch (e) {
      console.log(e);
      break;
    }
  }
  const metadataEndpoint = `https://vjudge.net/contest/rank/single/${contest.id}`;
  const metadataResponse = await fetch(metadataEndpoint);
  const metadataJson = await metadataResponse.json();
  const participants = metadataJson.participants;

  return { problems, contest, submissions, participants };
}
