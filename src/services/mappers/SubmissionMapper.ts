import { NewSubmission, Submission } from "@/db/schema/submission";
import { SubmissionType } from "@/types/contest.types";
import { DataUtils } from "@/utils/DataUtils";
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

  static toSubmissionType(submission: Submission): SubmissionType {
    return {
      ...submission,
      result: submission.result ?? "",
      language: submission.language ?? "",
      submissionDateTime: DateUtils.toPostgresDate(
        submission.submissionDateTime
      ),
      index: DataUtils.getProblemIndex(submission.problemId),
    };
  }

  static async toSubmissionTypeListAsync(
    submissions: Promise<Submission[]>
  ): Promise<SubmissionType[]> {
    const submissionList = await submissions;
    return submissionList.map(this.toSubmissionType);
  }
}
