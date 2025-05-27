import { PrismaClient } from "@/app/generated/prisma"; 
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();

    const user = await prisma.login.create({
      data: {
        name: body.name,
        email: body.email,
      },
    });

    return NextResponse.json({ user }, { status: 201 }); 
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
