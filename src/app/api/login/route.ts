import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, hashedPassword } = body;

  if (!email || !hashedPassword) {
    return new NextResponse("Missing fields", { status: 400 });
  }
  const userExists = await prisma.user.findUnique({
    where: { email, hashedPassword },
  });

  if (!userExists) return new NextResponse("Invalid Email or password", { status: 400 });
  if (userExists) return NextResponse.redirect("/my-lake");
}
