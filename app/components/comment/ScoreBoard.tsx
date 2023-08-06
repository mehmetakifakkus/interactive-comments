import Image from "next/image";
import React from "react";

type Props = {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
};

export default function ScoreBoard({ score, setScore }: Props) {
  return (
    <div className="w-28 h-8 sm:w-[32px] sm:h-20 sm:py-2 rounded-lg bg-gray-100">
      <div className="flex sm:flex-col h-8 sm:h-16 px-1 items-center justify-around">
        <div
          className="p-1 hover:cursor-pointer select-none"
          onClick={() => {
            setScore((score) => score + 1);
          }}
        >
          <Image
            src="/images/icon-plus.svg"
            className="w-3"
            width={20}
            height={20}
            alt="upvote"
          />
        </div>
        <span className="text-sm font-bold text-blue-900 select-none">
          {score}
        </span>
        <div
          className="p-1 hover:cursor-pointer select-none"
          onClick={() => {
            setScore((score) => score - 1);
          }}
        >
          <Image
            src="/images/icon-minus.svg"
            className="w-3"
            width={20}
            height={20}
            alt="upvote"
          />
        </div>
      </div>
    </div>
  );
}
