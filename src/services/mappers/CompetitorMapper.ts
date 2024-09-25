import { NewCompetitor } from "@/db/schema/competitor";
import { ContestStandingType, SubmissionType } from "@/types/contest.types";

export class CompetitorMapper {
  static toNewCompetitor(standing: ContestStandingType): NewCompetitor {
    const { userName, universityName } = standing;
    return {
      name: userName,
      universityName,
    };
  }
  static toNewCompetitorList(
    standings: ContestStandingType[]
  ): NewCompetitor[] {
    return standings.map(this.toNewCompetitor);
  }

  static toNewCompetitorSet(
    submissions: SubmissionType[] | undefined,
    standings: ContestStandingType[]
  ): NewCompetitor[] {
    const competitorsMap = new Map<string, NewCompetitor>();
    submissions?.forEach((submission) => {
      competitorsMap.set(submission.userName, {
        name: submission.userName,
        universityName: null,
      });
    });
    standings.forEach((standing) => {
      competitorsMap.set(standing.userName, {
        name: standing.userName,
        universityName: standing.universityName,
      });
    });
    return Array.from(competitorsMap.values());
  }
}
