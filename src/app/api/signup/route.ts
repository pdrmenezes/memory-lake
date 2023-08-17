import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, hashedPassword } = body;

  if (!name || !email || !hashedPassword) {
    return new NextResponse("Missing fields", { status: 400 });
  }
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) throw new Error("An account already exists with this Email");

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
