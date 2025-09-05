// app/api/rank/route.js
import { NextResponse } from "next/server";
import { rankCandidates } from "@/lib/ranker";

export async function POST(req) {
  try {
    const body = await req.json();

    // Expect { job: {...}, candidates: [...] }
    const { job, candidates, options } = body || {};

    if (!job) {
      return NextResponse.json({ error: "Job object required" }, { status: 400 });
    }
    if (!Array.isArray(candidates) || candidates.length === 0) {
      return NextResponse.json({ error: "Candidates array required" }, { status: 400 });
    }

    const ranked = rankCandidates(job, candidates, options);

    return NextResponse.json({ success: true, ranked }, { status: 200 });
  } catch (err) {
    console.error("Ranking error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
