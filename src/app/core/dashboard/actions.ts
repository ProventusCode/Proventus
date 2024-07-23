"use server";

export async function loadLookerDashboardUrl(): Promise<string> {
  return process.env.LOOKER_STUDIO_FRAME!;
}
