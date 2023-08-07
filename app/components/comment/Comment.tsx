"use client";

import { CommentProps, ReplyComment } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import DeleteComment from "../DeleteComment";
import ScoreBoard from "./ScoreBoard";
import ImageSection from "./ImageSection";
import ContentSection from "./ContentSection";
import AddComment from "../AddComment";

type Props = {
  comment: CommentProps | ReplyComment;
  isReply?: boolean;
  parentComment?: CommentProps;
};

const buttonGenerator = (type: string, color: string, func?: () => void) => (
  <button
    className="font-semibold flex flex-row gap-2 px-2 items-center"
    onClick={func}
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
  setIsEditMode,
  setIsReplyMode,
}: {
  isOwner: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setIsReplyMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <div className="flex flex-row gap-2">
    {isOwner &&
      buttonGenerator("delete", "text-red-600", () => {
        setOpened ? setOpened(true) : null;
      })}
    {isOwner
      ? buttonGenerator("edit", "text-blue-800", () => {
          setIsEditMode(true);
        })
      : buttonGenerator("reply", "text-blue-800", () => {
          setIsReplyMode(true);
        })}
  </div>
);

export default function Comment({
  comment,
  isReply = false,
  parentComment,
}: Props) {
  const [score, setScore] = useState<number>(comment.score);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isReplyMode, setIsReplyMode] = useState(false);

  const { user } = useUserContext();
  const isOwner = user?.username === comment.user.username;

  return (
    <>
      <DeleteComment
        isModalOpened={isModalOpened}
        setIsModalOpened={setIsModalOpened}
        comment={comment}
      />
      <div
        key={comment.id}
        className={`text-sm ${
          isReply ? "w-[340px] sm:w-[572px]" : "w-[360px] sm:w-[640px]"
        } text-gray-500 bg-white p-5 rounded-lg`}
      >
        <div className="flex flex-row gap-4">
          <div className="hidden sm:block">
            <ScoreBoard score={score} comment={comment} setScore={setScore} />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-row mb-3 justify-between items-center">
              <ImageSection comment={comment} isOwner={isOwner} />
              <div className="hidden sm:block">
                <ActionSection
                  isOwner={isOwner}
                  setOpened={setIsModalOpened}
                  setIsEditMode={setIsEditMode}
                  setIsReplyMode={setIsReplyMode}
                />
              </div>
            </div>
            <ContentSection
              isEditMode={isEditMode}
              comment={comment}
              isReply={isReply}
              setIsEditMode={setIsEditMode}
            />
            <div className="flex sm:hidden mt-4 justify-between">
              <ScoreBoard score={score} comment={comment} setScore={setScore} />
              <ActionSection
                isOwner={isOwner}
                setOpened={setIsModalOpened}
                setIsEditMode={setIsEditMode}
                setIsReplyMode={setIsReplyMode}
              />
            </div>
          </div>
        </div>
      </div>
      {isReplyMode && (
        <AddComment
          currentUser={user}
          isReply={isReply}
          isReplyMode={isReplyMode}
          setIsReplyMode={setIsReplyMode}
          parentComment={isReply ? parentComment : comment}
        />
      )}
    </>
  );
}
