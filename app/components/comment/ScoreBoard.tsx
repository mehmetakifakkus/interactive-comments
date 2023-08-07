import { useCommentContext } from "@/app/context/CommentContext";
import Image from "next/image";
import React from "react";
import { CommentProps, ReplyComment } from "@/types";

type Props = {
  score: number;
  comment: CommentProps | ReplyComment;
  setScore: React.Dispatch<React.SetStateAction<number>>;
};

export default function ScoreBoard({ score, comment, setScore }: Props) {
  const { updateScore } = useCommentContext();

  return (
    <div className="w-28 h-8 sm:w-[36px] sm:h-[92px] sm:py-2 rounded-lg bg-lightgray">
      <div className="flex sm:flex-col h-8 sm:h-16 px-1 items-center justify-around ">
        <div
          className="p-1 hover:cursor-pointer select-none"
          onClick={() => {
            setScore((score) => score + 1);
            updateScore(score + 1, comment);
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
        <span className="font-bold text-blue-900 select-none">{score}</span>
        <div
          className="p-1 hover:cursor-pointer select-none"
          onClick={() => {
            setScore((score) => score - 1);
            updateScore(score - 1, comment);
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
