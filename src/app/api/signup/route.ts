import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, hashedPassword } = body as {
      name: string;
      email: string;
      hashedPassword: string;
    };

    if (!name || !email || !hashedPassword) {
      throw new Error("Missing fields");
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) throw new Error("An account already exists with this Email");

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        hashedPassword,
      },
    });

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
