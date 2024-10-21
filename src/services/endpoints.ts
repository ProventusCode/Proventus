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
      "q=proj:rank,institution,teamName,problemsSolved,totalTime,lastProblemTime,medalCitation&page=1&size=200",
    contest:
      "https://icpc.global/api/contest/public/ColombiaMaratonNalACISREDIS",
    count: "https://icpc.global/api/contest/public/search/contest",
    finder: "https://icpc.global/regionals/finder/ColombiaMaratonNalACISREDIS",
    standings: "https://icpc.global/api/contest/public/search/contest",
  },
};
