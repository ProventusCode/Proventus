export const ENDPOINTS = {
  proxy: "https://api.wintr.com/fetch",
  vjudge: {
    rank: "https://vjudge.net/contest/rank/single",
    contest: "https://vjudge.net/contest",
    status: "https://vjudge.net/status/data",
    user: "https://vjudge.net/user",
  },
  icpc: {
    queryParams:
      "q=proj:teamId,time,rank,institution,teamName,problemsSolved,totalTime,lastProblemTime,medalCitation%3Bsort:rank+asc,problemsSolved+desc,totalTime+asc,lastProblemTime+asc%3B&page=1",
    contest: "https://icpc.global/regionals/finder/",
    standings: "https://icpc.global/api/contest/public/search/contest/",
    count: "https://icpc.global/api/contest/public/search/contest",
  },
};
