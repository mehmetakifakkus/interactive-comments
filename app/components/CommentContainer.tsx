"use client";

import { CommentProps } from "@/types";
import React from "react";
import Comment from "./comment/Comment";

type Props = { comment: CommentProps };

export default function CommentContainer({ comment }: Props) {
  return (
    <>
      <Comment comment={comment} isReply={false} />
      {comment.replies.length > 0 && (
        <div className="flex flex-row justify-between">
          <div className="sm:ml-10 border-l border-gray-300" />
          <div className="space-y-4">
            {comment.replies.map((reply) => (
              <Comment key={reply.id} comment={reply} isReply={true} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
