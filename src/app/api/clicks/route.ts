import { NextResponse } from "next/server";
import { linkIds } from "@/data/profile";
import { getClickCounts, incrementClick } from "@/lib/clicks";

export const dynamic = "force-dynamic";

// 페이지가 열릴 때 모든 링크의 클릭 수를 한 번에 가져간다: { "github": 42, ... }
export async function GET() {
  const counts = await getClickCounts();
  if (!counts) {
    return NextResponse.json({ error: "클릭 수를 불러올 수 없습니다." }, { status: 503 });
  }
  return NextResponse.json(counts, { headers: { "Cache-Control": "no-store" } });
}

// 링크 카드가 navigator.sendBeacon으로 { id } 를 보낸다.
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return NextResponse.json({ error: "본문은 { \"id\": \"링크 id\" } 형식의 JSON이어야 합니다." }, { status: 400 });
  }

  if (typeof id !== "string" || !linkIds.has(id)) {
    return NextResponse.json({ error: "등록되지 않은 링크 id입니다." }, { status: 400 });
  }

  try {
    const saved = await incrementClick(id);
    if (!saved) {
      return NextResponse.json({ error: "MONGODB_URI가 설정되지 않아 클릭 수를 저장하지 않았습니다." }, { status: 503 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[clicks] 클릭 수를 저장하지 못했습니다:", error);
    return NextResponse.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
