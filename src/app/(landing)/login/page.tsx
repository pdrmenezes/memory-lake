import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex h-full flex-col items-center justify-center p-24">
      <div className="border border-lake-blue" id="form">
        <div className="border-b border-lake-blue py-2 pl-2 " id="form-header">
          <h2 className="uppercase text-lake-blue">login</h2>
        </div>
        <div className="flex flex-col items-center gap-4 px-10 py-6" id="form-content">
          <button className="inline-block rounded-full border-2 border-lake-blue px-3 py-2 uppercase text-lake-blue hover:bg-lake-blue/75 hover:text-white">
            continue with google
          </button>
          <span className="text-lake-blue">or</span>
          <div className="space-y-5" id="form-inputs">
            <div className="flex gap-2" id="email-input">
              <label htmlFor="email" className="uppercase text-lake-blue">
                e-mail
              </label>
              <input type="email" name="email" id="email" className="bg-lake-gray text-lake-blue" />
            </div>
            <div className="flex gap-2" id="password-input">
              <label htmlFor="password" className="uppercase text-lake-blue">
                password
              </label>
              <input type="password" name="password" id="password" className="bg-lake-gray text-lake-blue" />
            </div>
          </div>
          <Link href={"/my-lake"} className="rounded-full bg-lake-blue px-3 py-2 uppercase text-white">
            done
          </Link>
        </div>
      </div>
    </main>
  );
}
