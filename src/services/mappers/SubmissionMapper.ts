import { NewSubmission } from "@/db/schema/submission";
import { SubmissionType } from "@/types/contest.types";
import { DateUtils } from "@/utils/DateUtils";

export class SubmissionMapper {
  static toNewSubmission(submissionType: SubmissionType): NewSubmission {
    return {
      ...submissionType,
      submissionDateTime: DateUtils.parsePostgresDate(
        submissionType.submissionDateTime
      ),
    };
  }
  static toNewSubmissionList(submissions: SubmissionType[]): NewSubmission[] {
    return submissions.map(this.toNewSubmission);
  }
}
