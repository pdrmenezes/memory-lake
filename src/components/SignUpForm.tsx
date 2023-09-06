"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
import axios, { AxiosResponse } from "axios";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";

export function SignUpForm() {
  const { push } = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmationPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null | undefined>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const arePasswordsIdentical = data.password === data.confirmationPassword;
      const arePasswordsEmpty = (data.password || data.confirmationPassword) === (null || "");

      if (arePasswordsEmpty) {
        setError("Missing password field");
        setIsLoading(false);
      }
      if (!arePasswordsIdentical) {
        setError("Passwords should be identical");
        setIsLoading(false);
      }
      if (arePasswordsIdentical && !arePasswordsEmpty) {
        console.log("well done! passwords are identical, moving on...");

        const hashedPassword = await bcrypt.hash(data.password, 12);
        await axios
          .post("/api/signup", {
            name: data.name,
            email: data.email,
            hashedPassword,
          })
          .catch(function (error: any) {
            if (error.response) {
              setError(error.response.data.message);
            } else if (error.request) {
              console.log(error.request);
            } else {
              setError(error.message);
              console.log("Error", error.message);
            }
          });

        setIsLoading(false);
        push("/login");
      }
    } catch (error: any) {
      setIsLoading(false);
      setError(error);
      console.log("Sorry there was an error creating your user :(");
      console.error(error);
    }
  }

  return (
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
            className="bg-lake-gray-input text-lake-blue flex-1 px-1"
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
            className="bg-lake-gray-input text-lake-blue flex-1 px-1"
          />
        </div>
        {error && <p className="text-red-700 text-xs uppercase">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="self-center rounded-full border-2 border-lake-blue px-3 py-2 uppercase text-lake-blue hover:bg-lake-blue/75 hover:text-white"
        >
          {isLoading ? "loading" : "sign up"}
        </button>
      </form>
    </div>
  );
}
