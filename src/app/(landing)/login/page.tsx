import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LoginForm } from "@/components/LoginForm";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) return redirect("/my-lake");

  return (
    <main className="flex h-full flex-col items-center justify-center p-24">
      <div className="border border-lake-blue" id="form">
        <div className="border-b border-lake-blue py-2 pl-2 " id="form-header">
          <h2 className="uppercase text-lake-blue">login</h2>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
