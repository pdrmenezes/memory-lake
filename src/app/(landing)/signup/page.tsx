import { SignUpForm } from "@/components/SignUpForm/SignUpForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);

  if (session) return redirect("/my-lake");
  return (
    <main className="flex h-full flex-col items-center justify-center p-14">
      <div className="border border-lake-blue" id="form">
        <div className="border-b border-lake-blue py-2 pl-2 " id="form-header">
          <h2 className="uppercase text-lake-blue">sign up</h2>
        </div>
        <SignUpForm />
      </div>
    </main>
  );
}
