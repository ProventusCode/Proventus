import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const COUNT_URL =
    "https://icpc.global/api/contest/public/search/contest/7549/count?q=proj";

  const countResponse = await fetch(COUNT_URL);
  const countData = await countResponse.text();

  const ENV_URL =
    "https://icpc.global/api/contest/public/search/contest/7549?q=proj:teamId,time,rank,institution,teamName,problemsSolved,totalTime,lastProblemTime,medalCitation%3Bsort:rank+asc,problemsSolved+desc,totalTime+asc,lastProblemTime+asc%3B&page=1&size=" +
    countData;
  const response = await fetch(ENV_URL);

  const data = await response.json();

  return NextResponse.json(data);
}
