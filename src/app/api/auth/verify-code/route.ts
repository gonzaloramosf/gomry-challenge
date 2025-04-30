import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDB } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  const { email, code } = await req.json();

  if (!email || !code) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const docRef = adminDB.collection("verificationCodes").doc(email);
  const doc = await docRef.get();

  if (!doc.exists) {
    return NextResponse.json({ error: "Code not found" }, { status: 400 });
  }

  const data = doc.data();

  if (data?.code !== code || data?.expiresAt < Date.now()) {
    return NextResponse.json({ error: "Invalid or expired code" }, { status: 400 });
  }

  await docRef.delete();

  let user;
  try {
    user = await adminAuth.getUserByEmail(email);
  } catch {
    user = await adminAuth.createUser({ email });
  }

  const token = await adminAuth.createCustomToken(user.uid);

  const response = NextResponse.json({ token });

  response.cookies.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 5, // 5 days
    sameSite: 'strict',
  });

  return response;
}
