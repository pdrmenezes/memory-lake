import { SignUpDbSchema } from "@/components/SignUpForm/schema";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body: unknown = await request.json();
  const result = SignUpDbSchema.safeParse(body);

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  }

  try {
    const { name, email, hashedPassword } = body as {
      name: string;
      email: string;
      hashedPassword: string;
    };

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      zodErrors = { ...zodErrors, email: "An account already exists with this Email" };
      return NextResponse.json(Object.keys(zodErrors).length > 0 ? { errors: zodErrors } : null);
    } else {
      const user = await prisma.user.create({
        data: {
          name,
          email: email.toLowerCase(),
          hashedPassword,
        },
      });
      return NextResponse.json(
        Object.keys(zodErrors).length > 0
          ? { errors: zodErrors }
          : {
              success: "user successfully created!",
              user: {
                name: user.name,
                email: user.email,
              },
            }
      );
    }
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
