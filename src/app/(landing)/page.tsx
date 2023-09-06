import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) return redirect("/my-lake");

  return (
    <main className="flex h-full flex-col items-center justify-center p-24">
      <div className="place-items-center text-lake-blue">
        In computer science, a data lake is a centralized repository designed to store, process, and secure large amounts of structured,
        semistructured, and unstructured data. It can store data in its native format and process any variety of it. It means data lakes and our
        memories share things in common — both data and mementos can emerge depending on the input or moment we live in the present.
      </div>
    </main>
  );
}
