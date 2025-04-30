import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDB } from "@/lib/firebase-admin";

export async function GET(req: NextRequest) {
  const session = req.cookies.get("session")?.value;

  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  try {
    const { uid } = await adminAuth.verifySessionCookie(session, true);
    const snap = await adminDB.doc(`users/${uid}`).get();

    return NextResponse.json({ completedKyc: snap.data()?.completedKyc ?? false });

  } catch {
    return NextResponse.json({}, { status: 401 });
  }
}
