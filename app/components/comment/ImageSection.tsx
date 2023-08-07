import { CommentProps, ReplyComment } from "@/types";
import moment from "moment";
import Image from "next/image";
import React from "react";

type Props = { comment: CommentProps | ReplyComment; isOwner: boolean };

export default function ImageSection({ comment, isOwner }: Props) {
  return (
    <div className="flex flex-row gap-4 items-center">
      <Image
        src={comment.user.image.png}
        width={26}
        height={26}
        alt={comment.user.username}
      />
      <span className="font-semibold text-gray-600">
        {comment.user.username}
      </span>
      {isOwner && (
        <span className="text-white bg-blue-800 rounded px-2 font-semibold">
          you
        </span>
      )}
      <span className="text-gray-500">
        {moment(comment.createdAt, "MM/DD/YYYY HH:mm").fromNow()}
      </span>
    </div>
  );
}
