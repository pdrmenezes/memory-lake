import Link from "next/link";

export function Button({ content, path }: { content: string; path: string }) {
  return (
    <Link
      href={`${path}`}
      // className="inline-block rounded-full border border-white px-5 py-3 text-sm uppercase leading-none text-white hover:bg-white hover:text-black"
      className="inline-block rounded-full border-2 border-lake-blue bg-white px-5 py-3 text-sm uppercase leading-none text-lake-blue hover:border-white hover:bg-white/25 hover:text-white"
    >
      {content}
    </Link>
  );
}
