import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { upsertSectionProgress, type SectionStatus } from "@/lib/progress";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { language, section, status } = body;

    // Validate input
    if (!language || !section || !status) {
      return NextResponse.json(
        { error: "Missing required fields: language, section, status" },
        { status: 400 }
      );
    }

    const validStatuses: SectionStatus[] = ["not_started", "in_progress", "completed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    const result = await upsertSectionProgress(user.id, language, section, status);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to update progress" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in progress API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

