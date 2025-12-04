export type Direction = "next" | "prev";
export type SortOrder = "asc" | "desc";
export type SortBy = "createAt" | "firstName" | "lastName";

export const ResultsType = {
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
};

export interface PostVisaResultDto {
  result: "SUCCESS" | "FAILED";
  adminId: number;
  userId: string;
  applicationId: string;
}
