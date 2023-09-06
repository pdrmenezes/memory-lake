"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";

export function LoginForm() {
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null | undefined>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const signInResponse = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      setIsLoading(false);

      if (signInResponse && signInResponse.ok && !signInResponse.error) {
        router.push("/my-lake");
      } else {
        setError(signInResponse?.error);
      }
    } catch (error: any) {
      setIsLoading(false);
      setError(error);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 px-10 py-6" id="form-content">
      <GoogleSignInButton />
      <span className="text-lake-blue">or</span>
      <form onSubmit={handleSubmit} className="flex flex-col items-start space-y-5" id="form-inputs">
        <div className="flex gap-2 w-full" id="email-input">
          <label htmlFor="email" className="uppercase text-lake-blue">
            e-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="bg-lake-gray-input text-lake-blue flex-1 px-1"
          />
        </div>
        <div className="flex gap-2 w-full" id="password-input">
          <label htmlFor="password" className="uppercase text-lake-blue">
            password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="bg-lake-gray-input text-lake-blue flex-1 px-1"
          />
        </div>
        {error && <p className="text-red-700 text-xs uppercase">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="self-center rounded-full border-2 border-lake-blue px-3 py-2 uppercase text-lake-blue hover:bg-lake-blue/75 hover:text-white"
        >
          {isLoading ? "loading" : "done"}
        </button>
      </form>
    </div>
  );
}
