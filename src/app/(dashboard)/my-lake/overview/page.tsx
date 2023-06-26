import Link from "next/link";
import waterDrop from "@/assets/water-drop.svg";
import Image from "next/image";
import { MoveLeft } from "lucide-react";

export default function OverviewPage() {
  return (
    <main className="flex h-full w-full flex-col items-start justify-between">
      <div className="flex w-full flex-col" id="form">
        <div className="mb-4 border-b-2 border-b-lake-blue" id="form-title">
          <h2 className="mb-4 text-7xl uppercase text-lake-blue">laura&apos;s lake</h2>
        </div>
        <div className="mb-4 grid grid-cols-3 border-b-2 border-b-lake-blue pb-4 uppercase text-lake-blue" id="form-date">
          <h4 className="font-semibold">registered in</h4>
          <h5>sep 15th, 2023</h5>
          <h5></h5>
        </div>
        <div className="mb-4 grid grid-cols-3 border-b-2 border-b-lake-blue pb-4 uppercase text-lake-blue" id="form-date">
          <h4 className="font-semibold">
            <Image src={waterDrop} alt="water drop icon" />
          </h4>
          <h5>34 mementos in yout memory lake</h5>
          <span className="text-xs uppercase text-lake-gray">06 emerged / 28 still to meet you in the future</span>
        </div>
        <div className="mb-4 border-b-2 border-b-lake-blue pb-4 text-lake-blue">
          <input
            type="text"
            name="title"
            id="title"
            className="w-full text-4xl uppercase placeholder:text-lake-blue focus:outline-none"
            placeholder="title"
          />
        </div>
        <div className="mb-4 flex gap-4 border-b-2 border-b-lake-blue text-lake-blue">
          <span className="tex-sm self-start text-lake-gray">0/500</span>
          <textarea
            spellCheck={false}
            maxLength={500}
            name="description"
            id="description"
            className="h-[12ch] flex-1 resize-none border-none text-xl placeholder:text-lake-blue focus:outline-none focus:ring-0"
            placeholder="About what happened"
          />
        </div>
        <div className="mb-4 flex gap-4 border-b-2 border-b-lake-blue pb-4 text-lake-blue">
          <h4 className="tex-sm self-start font-semibold uppercase text-lake-blue">meet this memory </h4>
          <div className="flex-1 uppercase">when time comes</div>
        </div>
        <div className="mb-4 flex flex-col gap-4 border-b-2 border-b-lake-blue pb-4 text-lake-blue">
          <div className="flex gap-2 pr-4" id="email-input">
            <label htmlFor="email" className="tex-sm self-start font-semibold uppercase text-lake-blue">
              send in a bottle to
            </label>
            <input type="email" name="email" id="email" className="mr-6 flex-1 bg-lake-gray-input text-lake-blue focus:outline-none" />
          </div>
          <div className="flex gap-6">
            <span className="text-xs uppercase text-lake-gray">this memory will meet you both at the same time.</span>
            <span className="text-xs uppercase text-lake-gray">1/5 memories sent</span>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <Link
          href="/memories"
          className="flex items-center justify-center gap-1 rounded-full border-2 border-lake-blue px-3 py-2 text-sm uppercase text-lake-blue hover:bg-lake-blue/75 hover:text-white"
        >
          <MoveLeft />
          back to your memories
        </Link>
        <button className="inline-block rounded-full border-2 border-white bg-lake-blue px-3 py-2 text-sm uppercase text-white hover:border-lake-blue hover:bg-white hover:text-lake-blue">
          review
        </button>
      </div>
    </main>
  );
}
