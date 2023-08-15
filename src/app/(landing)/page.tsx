import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authConfig);
  if (session) return redirect("/my-lake");

  return (
    <main className="flex h-full flex-col items-center justify-center p-24">
      <div className="place-items-center text-lake-blue">No new memento</div>
    </main>
  );
}
