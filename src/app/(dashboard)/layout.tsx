import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import "../globals.css";
import { Archivo } from "next/font/google";
import scuba from "@/assets/scuba.svg";
import Image from "next/image";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-archivo",
});

export const metadata = {
  title: "Memory Lake | Memories",
  description: "Save mementos & share them with youself and your loved ones.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} bg-lake-blue font-sans text-gray-100 `}>
        <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
          {/* left column */}
          <div className="flex flex-col items-center justify-between overflow-hidden border-r border-black px-28 py-16">
            {/* {isAuthenticated ? <Profile /> : <SignIn />} */}
            <div className="flex h-full max-w-[420px] flex-1 items-center justify-center">
              <Link
                href="/memories/new"
                className="inline-block rounded-full border-2 border-lake-blue bg-white px-3 py-2 uppercase text-lake-blue hover:border-white hover:bg-white/25 hover:text-white"
              >
                new memory
              </Link>
            </div>
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
                <ChevronDownIcon size={20} />
                pt
              </Link>
            </div>
          </div>
          {/* right column */}
          <div className="flex flex-col items-center justify-between overflow-hidden bg-white">
            <Link href="/my-lake/overview" className="flex items-center gap-2 self-end px-12 pt-12">
              <ChevronDownIcon size={20} className="text-lake-blue" />
              <Image src={scuba} alt="scuba diver icon" />
            </Link>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
