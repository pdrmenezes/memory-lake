import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

// export async function GET(request: Request) {
//   const session = await getServerSession();
//   const memories = await prisma.memory.findMany({
//     where: { userId: session?.user?.email },
//   });

//   return memories;
// }
