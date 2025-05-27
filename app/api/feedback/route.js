import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();


export async function POST(request) {
  const body = await request.json();

  const feedback = await prisma.feedback.create({
    data: {
      name: body.name,
      email: body.email,
      message: body.message,
    },
  });

  return NextResponse.json({ success: true, feedback });
}