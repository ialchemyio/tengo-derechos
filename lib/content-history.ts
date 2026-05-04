export type ContentHistory = {
  contentId: string;
  version: number;
  updatedAt: string;
  updatedBy: string;
  changeSummary: string;
  resetReview: boolean;
};

export function shouldInvalidateReview(
  previousVersion: number,
  newVersion: number
): boolean {
  return newVersion > previousVersion;
}
