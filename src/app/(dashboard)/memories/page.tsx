export default function MemoriesPage() {
  return (
    <main className="flex h-full w-full flex-col items-center">
      <div className="flex flex-1 items-center">
        <h1 className="text-lake-blue">EVERY MEMORY</h1>
      </div>
      <hr className="mb-8 h-0.5 w-[9999px] bg-lake-blue" />
      <div className="self-start">
        <button className="inline-block rounded-full border-2 border-lake-blue px-3 py-2 text-sm uppercase text-lake-blue hover:bg-lake-blue/75 hover:text-white">
          see what emerges
        </button>
      </div>
    </main>
  );
}
