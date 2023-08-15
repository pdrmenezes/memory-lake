"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { GoogleSignInButton } from "@/components/authButtons";

export default function LoginPage(csrfToken: string) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const signInResponse = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      router.push("/my-lake");
    } else {
      console.log("Error: ", signInResponse);
      setError("Incorret Email or password, please try again or try signing up with a another account");
    }
  };

  return (
    <main className="flex h-full flex-col items-center justify-center p-24">
      <div className="border border-lake-blue" id="form">
        <div className="border-b border-lake-blue py-2 pl-2 " id="form-header">
          <h2 className="uppercase text-lake-blue">login</h2>
        </div>
        <div className="flex flex-col items-center gap-4 px-10 py-6" id="form-content">
          <GoogleSignInButton />
          <span className="text-lake-blue">or</span>
          <form onSubmit={handleSubmit} className="space-y-5" id="form-inputs">
            <div className="flex gap-2" id="email-input">
              <label htmlFor="email" className="uppercase text-lake-blue">
                e-mail
              </label>
              <input type="email" name="email" id="email" className="bg-lake-gray-input text-lake-blue" />
            </div>
            <div className="flex gap-2" id="password-input">
              <label htmlFor="password" className="uppercase text-lake-blue">
                password
              </label>
              <input type="password" name="password" id="password" className="bg-lake-gray-input text-lake-blue" />
            </div>
          </form>
          {error && <span className="p-4 mb-2 text-lg font-semibold text-yellow-500">{error}</span>}

          <button
            type="submit"
            className="inline-block rounded-full border-2 border-lake-blue px-3 py-2 uppercase text-lake-blue hover:bg-lake-blue/75 hover:text-white"
          >
            Login w/ NextAuth
          </button>
          <Link href={"/my-lake"} className="rounded-full bg-lake-blue px-3 py-2 uppercase text-white">
            done
          </Link>
        </div>
      </div>
    </main>
  );
}
