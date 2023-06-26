import Link from "next/link";

export default function MyLakePage() {
  return (
    <main className="flex h-full w-full flex-col items-center">
      <div className="mb-4 flex w-full flex-1 items-center justify-center border-b-2 border-b-lake-blue pb-4">
        <h1 className="text-lake-blue">EVERY MEMORY</h1>
      </div>

      <div className="self-start px-12 py-12">
        <Link
          href={`/memories/2`}
          className="inline-block rounded-full border-2 border-lake-blue px-3 py-2 uppercase text-lake-blue hover:bg-lake-blue/75 hover:text-white"
        >
          see what emerges
        </Link>
      </div>
    </main>
  );
}
