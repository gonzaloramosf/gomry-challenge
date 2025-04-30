import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { randomInt } from "crypto";
import { adminDB } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const code = String(randomInt(100000, 999999));
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  await adminDB.collection("verificationCodes").doc(email).set({
    code,
    expiresAt,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Wallet app" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Your verification for Wallet app",
    text: `Hi,\n\nYour verification code is: ${code}\n\nExpires in 5 minutes.\n\nThanks for using Wallet app.`,
  });

  return NextResponse.json({ success: true });
}
