import { Hero } from "@/components/Hero";
import "../globals.css";
import { Archivo } from "next/font/google";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import SessionProvider from "@/context/SessionProvider";
import { AuthenticateButtons } from "@/components/AuthenticateButtons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-archivo",
});

export const metadata = {
  title: "Memory Lake",
  description: "Save mementos & share them with youself and your loved ones.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${archivo.variable} bg-lake-blue font-sans text-gray-100 `}>
        <SessionProvider session={session}>
          <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
            {/* left column */}
            <div className="flex flex-col items-center justify-between overflow-hidden border-r border-black px-28 py-16">
              {/* {isAuthenticated ? <Profile /> : <SignIn />} */}
              <Hero />
              <div className="flex gap-6 self-start">
                <Link
                  href="/about"
                  className="inline-block rounded-full border-2 border-lake-blue bg-white px-3 py-2 uppercase text-lake-blue hover:border-white hover:bg-white/25 hover:text-white"
                >
                  about us
                </Link>
                <Link
                  href="/en"
                  className="flex items-center justify-center gap-1 rounded-full border-2 border-lake-blue bg-white px-3 py-2 uppercase text-lake-blue hover:border-white hover:bg-white/25 hover:text-white"
                >
                  <ChevronDown size={20} />
                  pt
                </Link>
              </div>
            </div>
            {/* right column */}
            <div className="flex max-h-screen flex-col items-center justify-between overflow-hidden bg-white px-28 py-16">
              <AuthenticateButtons />
              {children}
            </div>
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
