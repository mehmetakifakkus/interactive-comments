"use client";

import { CommentProps } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import DeleteComment from "../DeleteComment";
import ScoreBoard from "./ScoreBoard";
import ImageSection from "./ImageSection";

type Props = { comment: CommentProps; isReply?: boolean };

const button = (
  type: string,
  color: string,
  setOpened?: React.Dispatch<React.SetStateAction<boolean>>
) => (
  <button
    className="font-semibold flex flex-row gap-2 px-2 items-center"
    onClick={() => {
      setOpened ? setOpened(true) : null;
    }}
  >
    <Image
      className="w-3"
      src={`/images/icon-${type}.svg`}
      width={16}
      height={16}
      alt={`${type} button`}
    />
    <span className={color}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  </button>
);

const ActionSection = ({
  isOwner,
  setOpened,
}: {
  isOwner: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <div className="flex flex-row gap-2">
    {isOwner && button("delete", "text-red-600", setOpened)}
    {isOwner
      ? button("edit", "text-blue-800")
      : button("reply", "text-blue-800")}
  </div>
);

export default function Comment({ comment, isReply = false }: Props) {
  const [score, setScore] = React.useState<number>(comment.score);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const { user } = useUserContext();
  const isOwner = user?.username === comment.user.username;

  return (
    <>
      <DeleteComment
        isModalOpened={isModalOpened}
        setIsModalOpened={setIsModalOpened}
      />
      <div
        key={comment.id}
        className={`text-sm ${
          isReply ? "w-[340px] sm:w-[560px]" : "w-[360px] sm:w-[640px]"
        } text-gray-500 bg-white p-5 rounded-lg`}
      >
        <div className="flex flex-row gap-4">
          <div className="hidden sm:block">
            <ScoreBoard score={score} setScore={setScore} />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row mb-3 justify-between items-center">
              <ImageSection comment={comment} isOwner={isOwner} />
              <div className="hidden sm:block">
                <ActionSection isOwner={isOwner} setOpened={setIsModalOpened} />
              </div>
            </div>
            <span className="text-bold">{comment.content}</span>
            <div className="flex sm:hidden mt-4 justify-between">
              <ScoreBoard score={score} setScore={setScore} />
              <ActionSection isOwner={isOwner} setOpened={setIsModalOpened} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
