import { createClient } from "@/lib/supabase/server";

export type SectionStatus = "not_started" | "in_progress" | "completed";

export interface SectionProgress {
  language: string;
  section: string;
  status: SectionStatus;
  updated_at?: string;
}

/**
 * Get progress for all sections of a language
 * Returns a map of section slug to status
 */
export async function getSectionProgressForLanguage(
  userId: string,
  language: string
): Promise<Record<string, SectionStatus>> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("section_progress")
    .select("section, status")
    .eq("user_id", userId)
    .eq("language", language);

  if (error) {
    console.error("Error fetching section progress:", error);
    return {};
  }

  const progressMap: Record<string, SectionStatus> = {};
  if (data) {
    for (const row of data) {
      progressMap[row.section] = row.status as SectionStatus;
    }
  }

  return progressMap;
}

/**
 * Upsert section progress for a user
 */
export async function upsertSectionProgress(
  userId: string,
  language: string,
  section: string,
  status: SectionStatus
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase.from("section_progress").upsert(
    {
      user_id: userId,
      language,
      section,
      status,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "user_id,language,section",
    }
  );

  if (error) {
    console.error("Error upserting section progress:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

