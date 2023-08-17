"use client";
import { GoogleSignInButton } from "@/components/authButtons";
import { FormEvent, useState } from "react";
import bcrypt from "bcryptjs";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { push } = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmationPassword: "",
  });
  const [error, setError] = useState<string | undefined>();

  async function comparePasswords(password: string, confirmationPassword: string) {
    const arePasswordsEqual = password === confirmationPassword;
    if (!arePasswordsEqual) {
      setError("passwords are not identical");
      return false;
    }
    setError(undefined);
    return true;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const arePasswordsIdentical = await comparePasswords(data.password, data.confirmationPassword);

      if (arePasswordsIdentical) {
        console.log("well done! passwords are identical");

        const hashedPassword = await bcrypt.hash(data.password, 12);
        const response = await axios.post("/api/signup", {
          name: data.name,
          email: data.email,
          hashedPassword,
        });
        console.log(response);
        push("/my-lake");
      } else {
        console.log("Passwords should be identical");
      }
    } catch (error) {
      console.log("Error trying to create user");
      console.error(error);
    }
  }

  return (
    <main className="flex h-full flex-col items-center justify-center p-24">
      <div className="border border-lake-blue" id="form">
        <div className="border-b border-lake-blue py-2 pl-2 " id="form-header">
          <h2 className="uppercase text-lake-blue">sign up</h2>
        </div>
        <div className="flex flex-col items-center gap-4 px-10 py-6" id="form-content">
          <GoogleSignInButton />

          <span className="text-lake-blue">or</span>
          <form onSubmit={handleSubmit} className="flex flex-col items-start space-y-5" id="form-inputs">
            <div className="flex gap-2 w-full" id="name-input">
              <label htmlFor="name" className="uppercase text-lake-blue">
                name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="bg-lake-gray-input text-lake-blue flex-1"
              />
            </div>
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
                className="bg-lake-gray-input text-lake-blue flex-1"
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
                className="bg-lake-gray-input text-lake-blue flex-1"
              />
            </div>
            <div className="flex gap-2 w-full" id="repeat-password-input">
              <label htmlFor="repeat-password" className="uppercase text-lake-blue">
                repeat password
              </label>
              <input
                type="password"
                name="repeat-password"
                id="repeat-password"
                value={data.confirmationPassword}
                onChange={(e) => setData({ ...data, confirmationPassword: e.target.value })}
                className="bg-lake-gray-input text-lake-blue flex-1"
              />
            </div>
            {error && <p className="text-red-700 text-xs uppercase">{error}</p>}
            <button
              type="submit"
              className="self-center rounded-full bg-lake-blue px-3 py-2 uppercase text-white hover:text-lake-blue hover:bg-white hover:border-2 hover:border-lake-blue"
            >
              done
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
