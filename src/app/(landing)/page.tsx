import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) return redirect("/my-lake");

  return (
    <main className="flex h-full flex-col items-center justify-center md:px-8">
      <div className="place-items-center text-lake-blue space-y-5">
        <p>
          In computer science, a data lake is a centralized repository designed to store, process, and secure large
          amounts of structured, semistructured, and unstructured data. It can store data in its native format and
          process any variety of it.
        </p>
        <p>
          It means data lakes and our memories share things in common — both data and mementos can emerge depending on
          the input or moment we live in the present.
        </p>
        <p>
          MEMORY LAKE is a digital repository for personal mementos. If memories of past meet us for what we experience
          in the present, the lake is the possibility of getting in touch with endearing moments more often.
        </p>
        <hr className="w-1/3 my-4 h-0.5 bg-lake-blue" />
        <p>“In the present if you will, in the present to continue.”</p>
        <p>– Francis Allÿs</p>
      </div>
    </main>
  );
}
