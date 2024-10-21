interface IcpcContest {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  email: string;
}

interface IcpcStanding {
  teamId: number;
  rank: number;
  problemsSolved: number;
  totalTime: number;
  lastProblemTime: number;
  teamName: string;
  institution: string;
}
